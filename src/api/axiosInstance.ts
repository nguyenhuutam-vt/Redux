import axios, { AxiosRequestConfig } from "axios";

//  Cờ đánh dấu có đang refresh token không
let isRefreshing = false;

// Hàng đợi (queue) lưu các request bị lỗi 401 trong lúc refresh đang chạy
let failedQueue: {
  resolve: (value?: unknown) => void;
  reject: (error: unknown) => void;
  config: AxiosRequestConfig;
}[] = [];

//  Hàm xử lý queue sau khi refresh thành công hoặc thất bại
function processQueue(error: unknown, token: string | null = null) {
  failedQueue.forEach((prom) => {
    if (error) {
      // nếu refresh fail thì reject toàn bộ request trong queue
      prom.reject(error);
    } else if (token) {
      // nếu refresh ok thì gắn token mới và retry lại request
      prom.config.headers = {
        ...prom.config.headers,
        Authorization: `Bearer ${token}`,
      };
      prom.resolve(api(prom.config));
    }
  });
  // clear queue sau khi xử lý
  failedQueue = [];
}

//  Tạo axios instance riêng để config
export const api = axios.create({
  baseURL: "http://localhost:4000/api",
});

//  Request interceptor → tự động attach access token vào header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    if (config.headers && typeof config.headers.set === "function") {
      config.headers.set("Authorization", `Bearer ${token}`);
    } else if (config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  }
  return config;
});

//  Response interceptor → check lỗi từ server
api.interceptors.response.use(
  (response) => response, // pass response nếu ok
  async (error) => {
    const originalRequest = error.config;

    // Nếu nhận 401 (token hết hạn) và request này chưa retry lần nào
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Nếu đã có refresh đang chạy thì push request này vào queue và đợi
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, config: originalRequest });
        });
      }

      // đánh dấu request này đã retry
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // gọi API refresh token
        const refreshToken = localStorage.getItem("refresh_token");
        const { data } = await axios.post("http://localhost:4000/api/auth/refresh", { refreshToken });

        // lưu access token mới
        const newToken = data.accessToken;
        localStorage.setItem("access_token", newToken);
        api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;

        // retry lại toàn bộ request trong queue
        processQueue(null, newToken);

        // retry lại request ban đầu
        return api(originalRequest);
      } catch (refreshError) {
        // nếu refresh fail → reject queue + logout
        processQueue(refreshError, null);

        // show thông báo 1 lần
        showToastOnce("Your session has expired. Please log in again.");
        logoutUser();

        return Promise.reject(refreshError);
      } finally {
        // reset flag sau khi refresh xong
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// Utility: show toast chỉ một lần duy nhất
let toastShown = false;
function showToastOnce(msg: string) {
  if (!toastShown) {
    toastShown = true;
    alert(msg); // thay bằng react-toastify/antd notification trong thực tế
  }
}

//  logout: clear storage + redirect về login
function logoutUser() {
  localStorage.clear();
  window.location.href = "/login";
}

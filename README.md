## React + TypeScript + Vite

Template này được sử dụng cho series React/Next.JS

Các bước cần làm:

1. Clone dự án
2. Cài đặt các thư viện cần thiết: npm i
3. Chạy dự án với câu lệnh: npm run dev

---

# Kiến thức cốt lõi Redux Toolkit

## 1. Redux Toolkit

- Thư viện giúp quản lý state hiệu quả, đơn giản hóa Redux truyền thống.
- Sử dụng `createSlice` để tạo slice (state + reducer + actions).

## 2. Slice

- Một slice gồm: tên, state khởi tạo, reducers (đồng bộ), extraReducers (bất đồng bộ).
- Ví dụ:

```ts
export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: { ... },
	extraReducers: (builder) => { ... }
});
```

## 3. Async Actions (Thunk)

- Sử dụng `createAsyncThunk` để xử lý logic bất đồng bộ (gọi API, fetch dữ liệu...).
- Thunk nhận vào `thunkAPI` để dispatch action, truy cập state, v.v.
- Ví dụ:

```ts
export const fetchUser = createAsyncThunk(
	"users/fetchUser",
	async (userId, thunkAPI) => {
		const response = await fetch(...);
		return await response.json();
	}
);
```

## 4. extraReducers

- Xử lý kết quả trả về của các thunk (pending, fulfilled, rejected).
- Ví dụ:

```ts
builder.addCase(fetchUser.fulfilled, (state, action) => {
  state.listUser = action.payload;
});
```

## 5. thunkAPI

- Được truyền vào các async thunk, cho phép:
  - dispatch các action khác
  - truy cập state hiện tại
  - trả về rejectWithValue, v.v.

## 6. Quy trình chuẩn

1. Tạo slice với state, reducers, extraReducers.
2. Tạo các async thunk để fetch/update/delete dữ liệu.
3. Sử dụng thunkAPI để dispatch các action phụ trợ nếu cần.
4. Kết nối component với store qua hook (useSelector, useDispatch).

## 7. Axios Instance

- Tạo file `axiosInstance.ts` để cấu hình chung cho các request API.
- Giúp tái sử dụng cấu hình, quản lý request tập trung.

---

Truy cập: http://localhost:5173/

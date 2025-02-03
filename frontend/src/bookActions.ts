import { BookManage, BookManageJson, BookState } from "./domain/book";

// 修正
export const handleAddBook = async (
  prevState: BookState,
  formData: FormData,
  updateOptimisticBooks: (prevState: BookManage[]) => void
): Promise<BookState> => {
  const name = formData.get("bookName") as string;

  if (!name) {
    throw new Error("Book name is required");
  }

  // 追加
  updateOptimisticBooks([
    ...prevState.allBooks,
    new BookManage(0, name, "在庫あり"),
  ]);

  const response = await fetch("http://localhost:8080/books", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    throw new Error("Failed to add book");
  }

  const newBook = await response.json();
  return {
    ...prevState,
    allBooks: [...prevState.allBooks, newBook],
    filteredBooks: prevState.filteredBooks
      ? [...prevState.filteredBooks, newBook]
      : null,
  };
};

export const handleSearchBooks = async (
  prevState: BookState,
  formData: FormData
): Promise<BookState> => {
  const keyword = formData.get("keyword") as string;

  if (!keyword) {
    throw new Error("Keyword is required");
  }

  const response = await fetch(
    `http://localhost:8080/books?keyword=${keyword}`
  );
  const data = (await response.json()) as BookManageJson[];
  const filteredBooks = data.map(
    (book) => new BookManage(book.id, book.name, book.status)
  );

  return {
    ...prevState,
    filteredBooks,
    keyword,
  };
};

// 修正
export const handleUpdateBook = async (
  prevState: BookState,
  formData: FormData,
  updateOptimisticBooks: (books: BookManage[]) => void
): Promise<BookState> => {
  const id = Number(formData.get("id"));
  const status = formData.get("status") as string;

  // 表示中のリストを取得（検索結果がある場合はそちらを使用）
  const targetBooks = prevState.filteredBooks ?? prevState.allBooks;

  // 楽観的更新を適用
  updateOptimisticBooks(
    targetBooks.map((book) =>
      book.id === id ? new BookManage(book.id, book.name, status) : book
    )
  );

  const response = await fetch(`http://localhost:8080/books/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    throw new Error("Failed to update book");
  }

  const updatedBook = await response.json();

  return {
    ...prevState,
    allBooks: prevState.allBooks.map((book) =>
      book.id === id
        ? new BookManage(updatedBook.id, updatedBook.name, updatedBook.status)
        : book
    ),
    filteredBooks:
      prevState.filteredBooks?.map((book) =>
        book.id === id
          ? new BookManage(updatedBook.id, updatedBook.name, updatedBook.status)
          : book
      ) ?? null,
  };
};

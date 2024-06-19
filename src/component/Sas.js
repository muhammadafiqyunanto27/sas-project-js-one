import { useEffect, useState } from "react";

export function ArtikelFunction() {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem("data");
    return savedData ? JSON.parse(savedData) : [];
  });
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    if (!data.length) {
      fetch("https://dummyjson.com/posts")
        .then((response) => response.json())
        .then((artikel) => {
          setData(artikel.posts);
        })
        .catch((error) => console.error("fetching Data error:", error));
    }
  }, [data.length]);

  useEffect(() => {
    if (data.length) {
      localStorage.setItem("data", JSON.stringify(data));
    }
  }, [data]);

  const handleDelete = (id) => {
    const filteredData = data.filter((artikel) => artikel.id !== id);
    setData(filteredData);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const newArtikel = {
      id: data.length ? data[data.length - 1].id + 1 : 1,
      title: title,
      body: body,
    };
    const updatedData = [...data, newArtikel];
    setData(updatedData);
    setTitle("");
    setBody("");
    localStorage.setItem("data", JSON.stringify(updatedData));
  };

  if (!data.length) {
    return <div>...loading</div>;
  }

  return (
    <div>
      <h1>My Blog</h1>
      <hr />
      <form
        onSubmit={handleAdd}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          justifyContent: "center",
          alignItems: "center",
          paddingBottom:"50px"
        }}
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter article title"
          style={{ marginRight: "10px", width: "90%", padding: "  10px" }}
        />
        <input
          type="text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Enter article content"
          style={{ marginRight: "10px", width: "90%", padding: "  10px" }}
        />
        <button
          type="submit"
          style={{
            marginRight: "10px",
            width: "90%",
            padding: "  10px",
            backgroundColor: "black",
            color: "white",
            border: "none",
            borderRadius: "10px",
          }}
        >
          Add Article
        </button> <hr style={{width:"95%"}}/>
      </form>
     
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          padding: "20px",
        }}
      >
        {data.map((artikel, index) => (
          <div
            key={artikel + index}
            style={{
              border: "1px solid",
              padding: "20px",
              borderRadius: "10px",
              width: "40%",
              height: "400px",
            }}
          >
            <h3>{artikel.title}</h3>
            <div style={{ marginBottom: "10px" }}>
              {artikel.tags?.map((tag, index) => (
                <button
                  key={tag + index}
                  style={{
                    marginRight: "5px",
                    marginBottom: "5px",
                    padding: "5px 10px",
                    borderRadius: "10px",
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
            <hr />
            <p>{artikel.body}</p>
            <hr />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                paddingBottom:"30px",
                gap:"10px"
              }}
            >
              <span>Dilihat: {artikel?.views}</span>
              <span>Disukai: {artikel.reactions?.likes}</span>
              <span>Tidak disukai: {artikel.reactions?.dislikes}</span>
            </div>
            <button
              onClick={() => handleDelete(artikel.id)}
              style={{
                padding: "5px 19px",
                border: "none",
                borderRadius: "10px",
                backgroundColor: "#33272a",
                color: "white",
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

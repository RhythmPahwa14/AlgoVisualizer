import React from "react";

const TraitsSection = ({ copyCode, copiedCode }) => (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2>
        <i className="fas fa-puzzle-piece"></i> Traits
      </h2>
      <p>
        Traits define shared behavior in an abstract way. They're similar to interfaces in other languages.
      </p>

      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "traits" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`trait Summary {
    fn summarize(&self) -> String;
}

struct NewsArticle {
    headline: String,
    location: String,
    author: String,
    content: String,
}

impl Summary for NewsArticle {
    fn summarize(&self) -> String {
        format!("{}, by {} ({})", self.headline, self.author, self.location)
    }
}

fn main() {
    let article = NewsArticle {
        headline: String::from("Penguins win the Stanley Cup Championship!"),
        location: String::from("Pittsburgh, PA, USA"),
        author: String::from("Iceburgh"),
        content: String::from("The Pittsburgh Penguins once again are the best hockey team in the NHL."),
    };
    
    println!("New article available! {}", article.summarize());
}`,
              "traits"
            )
          }
        >
          {copiedCode === "traits" ? "Copied!" : "Copy"}
        </button>
        <pre>{`trait Summary {
    fn summarize(&self) -> String;
}

struct NewsArticle {
    headline: String,
    location: String,
    author: String,
    content: String,
}

impl Summary for NewsArticle {
    fn summarize(&self) -> String {
        format!("{}, by {} ({})", self.headline, self.author, self.location)
    }
}

fn main() {
    let article = NewsArticle {
        headline: String::from("Penguins win the Stanley Cup Championship!"),
        location: String::from("Pittsburgh, PA, USA"),
        author: String::from("Iceburgh"),
        content: String::from("The Pittsburgh Penguins once again are the best hockey team in the NHL."),
    };
    
    println!("New article available! {}", article.summarize());
}`}</pre>
      </div>
    </div>
  </section>
);

export default TraitsSection;
const contentTypes = {
  "c": {
    type: "text/x-csrc",
    displayName: ".c",
    "version": "10.2.0",
    placeholder: `#include <stdio.h>
	int main() {
		char str1[100], str2[100];
	
		printf("Enter first string: \\n");
		scanf("%s", str1);
	
		printf("Enter second string: \\n");
		scanf("%s", str2);
	
		printf("First string: %s\\n", str1);
		printf("Second string: %s\\n", str2);
	
		return 0;
	}`,
    stdin: "hello\nhi\n",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg"
  },
  "clojure": {
    version: "1.10.3",
    type: "text/x-closure",
    displayName: ".clj",
    placeholder: `(ns game-of-life)

(defn neighbors [[x y]]
  (for [dx [-1 0 1]
        dy (if (zero? dx) [-1 1] [-1 0 1])]
    [(+ dx x) (+ dy y)]))

(defn step [cells]
  (set (for [[cell n] (frequencies (mapcat neighbors cells))
             :when (or (= n 3)
                       (and (= n 2) (cells cell)))]
         cell)))

(defn print-grid [grid w h]
  (doseq [x (range (inc w))
          y (range (inc h))]
    (when (= y 0) (println))
    (print (if (grid [x y]) "[X]" " . "))))

(defn print-grids [grids w h]
  (doseq [grid grids]
    (print-grid grid w h)
    (println)))

(def grid #{[2 1] [2 2] [2 3]})
(print-grids (take 3 (iterate step grid)) 5 5)
`,
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/clojure/clojure-original.svg"
  },
  "python": {
    type: "text/x-python",
    displayName: ".py",
    "version": "3.10.0",
    placeholder: `def hello():
      print("Hello World")`,
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg"
  },

  "javascript": {
    type: "text/javascript",
    displayName: ".js", "version": "18.15.0",
    placeholder: `console.log("Hello World")`,
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg"
  },
  "lua": {
    type: "text/x-lua",
    displayName: ".lua", "version": "5.4.4",
    placeholder: `print("Hello World")`,
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/lua/lua-original.svg"
  },
  "rust": {
    type: "text/x-rustsrc",
    displayName: ".rs", "version": "1.68.2",
    placeholder: `fn main() {
      println!("Hello World");
  }`,
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg"
  },
  "crystal": {
    type: "text/x-crystal",
    displayName: ".cr",
    "version": "0.36.1",
    placeholder: `puts "Hello World"`,
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/crystal/crystal-original.svg"
  },
};

export default contentTypes;
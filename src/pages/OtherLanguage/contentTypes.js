const contentTypes = {
    "c": { type: "text/x-csrc", displayName: ".c", "version": "10.2.0", placeholder: `#include <stdio.h>
	int main() {
		char str1[100], str2[100];
	
		printf("Enter first string: ");
		scanf("%s", str1);
	
		printf("Enter second string: ");
		scanf("%s", str2);
	
		printf("First string: %s", str1);
		printf("Second string: %s", str2);
	
		return 0;
	}`,stdin:"hello\nhi\n" },
    "clojure": {
        type: "text/x-closure", displayName: ".clj", placeholder: `(ns game-of-life)\n
  (defn neighbors
    [[x y]]
    (for [dx [-1 0 1]
          dy (if (zero? dx)
               [-1 1]
               [-1 0 1])]
      [(+ dx x) (+ dy y)]))\n
  (defn step
    [cells]
    (set (for [[cell n] (frequencies (mapcat neighbors cells))
               :when (or (= n 3)
                         (and (= n 2)
                              (cells cell)))]
           cell)))
  
  (defn print-grid
    [grid w h]
    (doseq [x (range (inc w))
            y (range (inc h))]
      (when (= y 0) (println))
      (print (if (grid [x y])
               "[X]"
               " . "))))
  
  (defn print-grids
    [grids w h]
    (doseq [grid grids]
      (print-grid grid w h)
      (println)))
  
  (def grid
    #{[2 1] [2 2] [2 3]})
    \n
  (print-grids (take 3 (iterate step grid)) 5 5)` },
    "python": {
        type: "text/x-python", displayName: ".py", "version": "3.10.0", placeholder: `def hello():
      print("Hello World")` },

    "javascript": { type: "text/javascript", displayName: ".js", "version": "18.15.0", placeholder: `console.log("Hello World")` },
    "lua": { type: "text/x-lua", displayName: ".lua", "version": "5.4.4", placeholder: `print("Hello World")` },
    "rust": {
        type: "text/x-rustsrc", displayName: ".rs", "version": "1.68.2", placeholder: `fn main() {
      println!("Hello World");
  }` },
    "crystal": { type: "text/x-crystal", displayName: ".cr", "version": "0.36.1", placeholder: `puts "Hello World"` },
};

export default contentTypes;
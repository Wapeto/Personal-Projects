fn main() {
    let mut x = 5;
    println!("The value of x is: {x}");
    let x = "Hey";
    println!("The value of x is: {x}");
    let x = "Oh";

    other_fun((21,23));
}

fn other_fun((x:u32,y:u32)){
    println!("this is x : {x}");
}
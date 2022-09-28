use std::io;



fn main() {
    c_f_convertor();
}

fn other_fun(x:i32, y:&str){
    println!("this is x : {}, and this is y : {}", x, y);
}

fn c_f_convertor(){
    let mut unit = String::new();

    println!("To witch unit would you like to convert ?\n1.Celsius\t2.Fahrenheit");


    io::stdin()
        .read_line(&mut unit)
        .expect("Failed to read line");

    let mut unit: u8 = unit.trim().parse().expect("This is not a number !");
    

    println!("You chose {unit}");

    println!("Enter the temperature you wish to convert");

    let mut temp = String::new();

    io::stdin()
        .read_line(&mut temp)
        .expect("Failed to read line");

    let temp: f32 = temp.trim().parse().expect("This is not a number !");

    let mut result: f32 = 0.0;
    if unit == 1 {
        result =  (temp-32.0)/1.8;
    } else if unit == 2{
        result = temp * 1.8 + 32.0;
    }else {println!("Fuck this shit am out !")}
    let unit_str = if unit == 1 {"C"} else {"F"};
    println!("This equals to {result}°{unit_str}");
}
#include <stdio.h>
typedef struct
{
    char * name;
    int age;
    char * sex;
}person;

int main(){
    person josh;
    josh.name = "Josh";
    josh.age = 19;
    josh.sex = "M";

    printf("This beautiful gentlemen is called %s and he is %d", josh.name, josh.age);
}

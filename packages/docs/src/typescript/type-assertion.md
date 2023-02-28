# 类型断言

在Typescript中，类型断言（Type Assertion）是一种告诉编译器变量类型的方式。它是将一个变量从一种数据类型转换为另一种数据类型的方法。本文将介绍类型断言的语法和使用方法。

## 语法

在Typescript中，有两种类型断言的语法：

1. 尖括号语法

    ```typescript
    let someValue: any = "hello world";
    let strLength: number = (<string>someValue).length;
    
    ```

2. as语法

    ```typescript
    let someValue: any = "hello world";
    let strLength: number = (someValue as string).length;
    
    ```

## 使用方法

在实际开发中，类型断言通常用于处理以下场景：

1. 当我们知道一个变量的类型，但是编译器无法确定类型时，可以使用类型断言。

    ```typescript
    let someValue: any = "hello world";
    let strLength: number = (someValue as string).length;
    
    ```

2. 当我们需要将一个联合类型断言为其中一个类型时，可以使用类型断言。

    ```typescript
    interface Cat {
        name: string;
        run(): void;
    }
    
    interface Fish {
        name: string;
        swim(): void;
    }
    
    function getName(animal: Cat | Fish) {
        return (animal as Cat).name;
    }
    
    ```

3. 当我们需要将一个父类断言为更具体的子类时，可以使用类型断言。

    ```typescript
    class ApiError extends Error {
        code: number = 0;
    }
    
    class HttpError extends Error {
        statusCode: number = 200;
    }
    
    function isApiError(error: Error) {
        if (typeof (error as ApiError).code === 'number') {
            return true;
        }
        return false;
    }
    
    ```

总结：类型断言是一种告诉编译器变量类型的方式，它可以将一个变量从一种数据类型转换为另一种数据类型。在实际开发中，我们通常用于处理类型不确定、联合类型和父类类型转换为子类类型的场景。

# typescript中的基础类型

## 字符串类型

```typescript
let str: string = 'hello world'
```

## 数字类型

```typescript
let num: number = 123
```

## 布尔类型

```typescript
let bool1: boolean = true
let bool2: boolean = false

```

## 数组类型

```typescript
let arr1: number[] = [1, 2, 3]
let arr2: string[] = ['a', 'b', 'c']
let arr3: boolean[] = [true, false, true]
let arr4: Array<number> = [1, 2, 3]
```

如果规范了数组中的数据类型，那么数组中的数据类型必须一致

## 元组类型

```typescript
let tuple: [string, number] = ['hello', 123]
```

## 枚举类型
  
```typescript
emum Color {
  Red,
  Green,
  Blue
}
let c: Color = Color.Green
```

## 任意类型

```typescript
let any: any = 123
any = 'hello'
any = true
```

## null 和 undefined

```typescript
let u: undefined = undefined
let n: null = null
```

## void 类型

```typescript
function fn(): void {
  console.log('hello world')
}

```

## never 类型

```typescript
function fn(): never {
  throw new Error('error')
}
```

## object 类型

```typescript
let obj: object = {}
obj = function () {}
```

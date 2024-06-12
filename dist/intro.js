"use strict";
// const name : string ="mamta bisht"
// const num1=22
// num1.toString()
// console.log(typeof num1)
// const fn=(num : number, istrue: boolean)=>{
// return num*2
// }
// const newFn=fn(1,true)
// console.log(newFn)
Object.defineProperty(exports, "__esModule", { value: true });
// const arr=["mmata",22,true]
// arr.map((arrData)=>{
//     console.log(arrData)
// })
// type User={
//     name :string,
//     email:String
// }
// const example =(user:User):User=>{
//     return {name :"mamta",email:"email"}
// }
// const result=example({name:"",email:""})
// console.log(result)
// type newObj ={
//     readonly name :string
// }
// const obj1 : newObj ={
//     name:"name is readable only"
// }
// obj1.name="trying to change the name which has assigned type : readonly "
// class readOnlyClass {
//     readonly name1 :"new Name"
// }
// const a=new readOnlyClass()
// a.name1="mamta"
// type flowerObj={
//     flowerName :string,
//     flowerColor?: string  
// }
// const myflower : flowerObj ={
// flowerName:"lotus"
// }
// console.log(myflower)
// type petalCount ={
// petalNum : number
// }
// type flowerDetails = {
//     name : string
// } & petalCount & {
//     flowerColor:string
// }
// type flower={
//     flowerDetail :flowerDetails
// }
// const newFlower:flower={
// flowerDetail : {
//      name :"waterLily",
//      petalNum:20,
//      flowerColor:"white"}
// }
// console.log(
//     typeof newFlower.flowerDetail.name ,
//     typeof newFlower.flowerDetail.petalNum,
//     typeof newFlower.flowerDetail.flowerColor, 
//     newFlower
// )
// const arr:string []=["this is string"]
// const arr1:boolean []=[true]
// const arr2:(number|boolean|string )[]=[1,true,"mamta"]
// const tuple:[string,number]=["mamta bisht",23]
// console.log(
//     arr,
//     arr1,
//     arr2,
//     tuple
// )
// const myArr:any []=["strt","end",2, true]
// console.log(myArr)
var myEnums;
(function (myEnums) {
    myEnums["name"] = "aaa";
    myEnums[myEnums["class"] = 12] = "class";
    myEnums[myEnums["rollNum"] = 12] = "rollNum";
})(myEnums || (myEnums = {}));
const newUser = {
    name: myEnums.name,
    class: myEnums.class,
    rollNum: myEnums.rollNum,
    firstFunc: () => {
        return "shashi";
    },
    secondFunc: (param) => {
        const newNum = param * 2;
        return { newNum: newNum, isNum: true };
    },
    newName: "mamta",
    newUserName: "srishti",
    phone: "+918978766788",
    gen: "1st"
};
console.log(newUser);
console.log(newUser.firstFunc());
console.log(newUser.secondFunc(4));

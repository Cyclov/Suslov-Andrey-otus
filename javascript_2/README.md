# About

javascript 2 homework

# Description

promiseReduce - работа с асинхронными функциями
Написать функцию

promiseReduce(asyncFunctions, reduce, initialValue)

asyncFunctions - массив асинхронных функций, возвращающих промис
reduce(memo, value) - функция, которая будет вызвана для каждого успешно завершившегося промиса.
initialValue - стартовое значение для функции reduce

promiseReduce последовательно вызывает переданные асинхронные функции
и выполняет reduce функцию сразу при получении результата до вызова следующей асинхронной функции. Функция promiseReduce должна возвращать промис с конечным результатом.

# How to

run OTUS-home work 2 html
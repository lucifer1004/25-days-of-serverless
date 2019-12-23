"use strict";

const results = ["נ", "ג", "ה", "ש"];

exports.main_handler = async (event, context, callback) => {
  console.log("%j", event);
  const result = Math.trunc(Math.random() * 4);
  return `陀螺朝上的面是：${results[result]}`;
};

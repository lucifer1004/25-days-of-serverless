# 挑战一：光明节陀螺

> 以下内容摘自维基百科：
>
> 光明节陀螺（意第绪语：דרײדל‎，拉丁化：dreydl；希伯来语：סביבון‎，拉丁化：Sevivon），四面陀螺的一种，是犹太节日光明节的传统玩具，通常用于赌博游戏。陀螺的四面分别书上一个希伯来字母：נ‎（Nun）、ג‎（Gimel）、ה‎（Hei）和 ש‎（Shin），合起来可拼成“נס גדול היה שם‎”（一个伟大的奇迹在那里发生）的缩写。这四个字母也可以组成一个光明节陀螺赌博游戏的规则的缩写：Nun 代表意第绪语单词“nit”（没有）；Hei 代表“halb”（一半）；Gimel 代表“gants”（所有）；Shin 则代表“shteln”（放置）。在以色列，大部分陀螺书上字母 פ‎ 而不是 ש‎，得出“נס גדול היה פה‎”（一个伟大的奇迹在这里发生），以指出该“伟大的奇迹”在以色列发生。

这里要实现的，就是一个掷陀螺的 API。用户调用 API，得到一个随机返回的陀螺结果。

直接使用腾讯云`scf-cli`提供的创建模板

```bash
scf init -n challenge-1 -r nodejs8.9
```

模板中提供的`template.yaml`中的`Role`字段可能与你的账户中设置不符合，需要对应设置。`Description`字段可以按照你的想法设置成想要的内容。其他字段采用默认设置即可，不需要进行修改。

对应的代码很简单，使用 NodeJS 内置的`Math.random()`函数即可。注意取整时用`Math.trunc()`，这样可以保证等概率地取到 4 个结果。

```js
const results = ["נ", "ג", "ה", "ש"];

exports.main_handler = async (event, context, callback) => {
  console.log("%j", event);
  const result = Math.trunc(Math.random() * 4);
  return `陀螺朝上的面是：${results[result]}`;
};
```

这时候就可以使用 VSCode 的`tencent-SCF`插件来发布这个云函数了。

发布之后，由于没有在`template.yml`中设置触发方式，这个函数暂时还不能真正工作。这时，可以到云函数控制台中，找到对应的函数，在“触发方式”配置中，点击“添加触发方式”，然后添加一个“API 网关触发器”。

![添加API网关触发器](/images/添加触发器.png)

选择“新建 API 服务”，起一个名字，其余均使用默认配置。

点击“保存”后，就会自动配置对应的触发器，并在下方显示出来。

![已添加的API网关触发器](/images/成功添加触发器.png)

这时，我们就可以点击“访问路径”的链接，看一看部署的云函数的实际效果了。

## 小结

第一个挑战，主要是为了熟悉云函数的使用和配置方法，并没有太大的难度。可以看到，在命令行工具`scf-cli`和 VSCode 插件`tencent-SCF`的辅助下，开发腾讯云云函数上手起来非常容易。

## 后续

如果不使用集成响应`IntegratedResponse`，云函数的返回会作为返回值的`body`字段。如果想要更加灵活地定制状态码和渲染内容，可以在`template.yml`或在控制台中配置启用集成响应，然后就可以返回定制的 HTML 等内容了。

最后放上[试玩地址](https://service-anfeux6t-1252420127.bj.apigw.tencentcs.com/release/challenge-1/dreidel)。

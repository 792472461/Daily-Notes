# HTML篇

## 对HTML语义化的理解

HTML语义化是指在编写HTML代码时，让代码的结构化、语义化，便于对浏览器、搜索引擎解析；使阅读源代码的人对代码的意图一目了然，便于团队开发和维护。

常见的SEO优化手段有：标题、关键字、描述、内容、链接等。其中，标题、关键字、描述是对页面进行设置的，而内容、链接是靠HTML标签来体现的。语义化的HTML代码，让搜索引擎容易识别网页。

语义化的好处：

- 对机器友好，带有语义的文字表现力丰富，更适合搜索引擎的爬虫爬取有效信息，有利于SEO。除此之外，语义类还支持读屏软件，根据文章可以自动生成目录；
- 对开发者友好，使用语义类标签增强了可读性，结构更加清晰，开发者能清晰的看出网页的结构，便于团队的开发与维护。

常见的语义化标签：

- header：定义文档或者区域的页眉；
- nav：定义导航链接的部分；
- section：定义文档中的节；
- main：定义文档的主要内容；
- article：定义文档中的独立结构，比如一篇文章、一条评论等；
- aside：定义文档的侧边栏；
- footer：定义文档或者区域的页脚；

## HTML5有哪些新特性、移除了那些元素

HTML5新增了很多新的标签，如：header、footer、nav、section、article、aside、figure、figcaption、time、mark、progress、meter、video、audio、canvas、datalist、keygen、output、details、summary、command、menu、dialog、source、track、embed、object、param、ruby、rt、rp、bdi、bdo、wbr、ins、del、canvas、svg、mathml等。

HTML5移除了一些元素，如：basefont、big、center、font、s、strike、tt、u等。

## HTML5的离线储存怎么使用，工作原理能不能解释一下

HTML5提供了离线存储的功能，可以在本地存储数据，即使用户断网也可以访问。

离线存储的原理是：在用户第一次访问网页时，会将网页的所有内容缓存到本地，当用户再次访问时，会先从本地加载网页，而不是从服务器加载。

离线存储的好处：

- 无需网络连接，用户可以访问网页；
- 加快了网页的访问速度；
- 减少了服务器的压力。

离线存储的使用：

- 首先，需要在html页面中添加一个manifest属性，属性值为manifest文件的路径；
- 然后，需要在manifest文件中添加需要缓存的文件，如：CACHE MANIFEST、NETWORK、FALLBACK等。

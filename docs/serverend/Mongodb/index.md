# Mongodb基础

## 常用命令

```
1、显示数据库列表
show dbs

2、切换或创建数据(有则切换，无则创建)
use 数据库名

3、删除数据库
db.dropDatabase()

六、集合操作

1、创建集合
db.createCollection(集合名, [参数])

2、查看集合
show collections/show tables

3、删除集合
db.集合名.drop()

七、数据基础操作

1、新增
db.集合名.insert({“键名1”:值1, “键名2”: 值2 …})

db.yunfan_test.insert({“name”:“张三”,“age”:24})

2、查询
db.集合名.findOne() # 查询一行

db.集合名.find() # 查询全部

db.集合名.find().pretty() # 格式化打印

db.集合名.find({查找条件}) # 按条件查找

db.yunfan_test.find({“age”:24})

3、修改
db.集合名.update({查询条件}, {修改后结果}) #修改整行

db.students.update({查找条件}, {$set:{“要修改的字段名1”:修改后的值, “要修改的字段名2”: “值2”}}) #修改指定字段的值

db.yunfan_test.update({“name”:“张三”}, {“name”:“张三”, “age”:25})

db.yunfan_test.update({“name”:“张三”}, {$set:{“age”:26}})

4、删除
db.集合名.remove({查询条件})

db.集合名.remove({}) # 删除全部数据

db.yunfan_test.remove({“name”:“张三”})

db.yunfan_test.remove({})

八、高级查询

1、比较运算符查询
db.集合名.find({“键名”: {比较运算符1:值1, 比较运算符2:值2} })

db.yunfan_test.find({“age”: {$lt:24}})

说明：

| 符号 | 释义 |

| :-- | :-- |

| $gt | 大于 |

| $lt | 小于 |

| $gte | 大于等于 |

| $lte | 小于等于欧 |

| $ne | 不等于 |

2、in/not in
db.集合名.find({“键名”: {$in:[值1, 值2, 值3 …]} })

db.集合名.find({“键名”: {$nin:[值1, 值2, 值3 …]} })

db.yunfan_test.find({“age”:{$in:[20,21,22]}})

db.yunfan_test.find({“age”:{$in:[20,21,22]}})

3、size
db.集合名.find({“键名”: {$size:n} })

db.yunfan_test.find({“list”:{$size:3}})

4、exists
db.集合名.find({“键名”: {$exist: true|false} })

db.yunfan_test.find({“flag”:{$exists:true}})

5、or
db.集合名.find({$or:[{条件1}, {条件2}, {条件3}…]})

db.yunfan_test.find({$or:[{“name”:“张三”},{“name”:“李四”}]})

6、模糊查询
db.集合名.find({“键名”: js正则表达)

db.yunfan_test.find({“name”:/张三/})

7、查询结果排序（sort）
db.集合名.find().sort({“键名”: 1｜-1, “键名”: 1｜-1…}) #1为升序, -1为降序

db.yunfan_test.find().sort({“age”:-1})

8、限定返回结果数量（limit）
db.集合名.find().limit(n)

db.集合名.find().skip(n) # 跳过n条，返回从n+1k开始的数据

db.集合名.find().skip(n).limit(m) # 跳过n条，返回后面的m条

db.yunfan_test.find().limit(1).sort({“age”:1})

9、查询返回结果数量（count）
db.集合名.find().count()

db.集合名.find().skip(n).count(true) # 与skip结合使用时，要加true

db.yunfan_test.find().count()

10、聚合函数
| 分组函数 | 说明 |

| :-- | :-- |

| s u m ∣ 计算总和， sum | 计算总和，sum∣计算总和，sum:1同count表示计数 |

| $avg | 计算平均值 |

| $min | 获取最小值 |

| $max | 获取最大值 |

| $push | 在结果文档中插入值到一个数组中，相当于拼接字段 |

| $first | 根据资源文档的排序获取第一个文档数据 |

| $last | 根据资源文档的排序获取最后一个文档数据 |

db.集合名.aggregate(

{$group:

{

_id:‘KaTeX parse error: Expected '}', got 'EOF' at end of input: 字段名', 别名:{聚合函数:’$字段名’}

}

}

);

## 例：统计同年龄的人数
db.yunfan_test.aggregate(

{$group:

{

_id:‘$age’,

count_age:{$sum:1}

```


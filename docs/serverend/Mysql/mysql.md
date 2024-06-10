# MySQL数据库的介绍

##  数据库的种类 

- 关系型数据库 RDBMS  （MySQL 、 SQL Server  、 Oracle 、 DB2  ）
- 非关系型数据库 NoSQL   (Redis 、  Memcache 、 MongoDB )

##  MySQL 

是一个开源免费的 数据库 、主要应用于 中小型 企业 ,  目前在一些大型企业中 也逐步采用 该数据库。 

## MySQL数据库的组成 

>  人们常说的  `数据库`  是一种简称 、关系型数据库的完整 名称 `数据库管理系统` ， MySQL 是由 多个  Database(数据库) 组成的 数据库管理系统

- Database  数据库、是用来存储 数据的 仓库 、每一个仓库 之间 是 相互独立的 。
  - Table  表 :   用来真正存储数据的容器、一个  Database 下 可以拥有 多个  Table 
    - Column  字段 ：  用来定义表中 每一列数据的  名称、类型、长度 等信息
    - Data  数据 ：用来存储数据
  - View  视图 ：  是一种 表 数据的映射信息 
  - Index  索引：  负责 优化数据库查询效率
  - Procedure 存储过程 
  - Function  函数 
  - Trigger  触发器
- 引擎

## 安装 MySQL 数据库 

[下载地址](https://downloads.mysql.com/archives/community/): https://downloads.mysql.com/archives/community/

1. 解压  mysql-8.0.20-winx64.zip  到  MySQL 文件夹 中 
2. 在 MySQL 目录 下 、新建一个  my.ini  文件  (MySQL的配置文件)

```mysql
[mysqld]
basedir=D:/Program Files/MySQL
datadir=D:/Program Files/MySQL/data
port=3306
```

3. 以管理员身份 打开命令提示符、并切换到  D:\Program Files\MySQL\bin 目录下

```mysql
mysqld  --initialize-insecure  --user=mysql
```

>   上面的命令 会生成 内置数据库需要的文件、并 创建一个  默认  账户为  root ,  且 密码为空的  超级用户   

4. 将  mysql 设置为 开机自启 服务

```
mysqld   install
```

5. 将 D:\Program Files\MySQL\bin 配置 到环境变量 Path 中 ， 方便再 命令提示符中 快速找到 mysql 相关命令 
6. 启动 mysql 数据库

```
net  start  mysql
```

>  如果 启动失败 、将 压缩包中的  vcruntime140_1.dll  拷贝到  D:\Program Files\MySQL\bin 目录下 

## 卸载 MySQL 

1. 停止 mysql 数据库

```mysql
net  stop mysql
```

2. 卸载 服务

```mysql
mysqld  remove
```

3. 删除 MySQL 目录

## 数据类型 

- 结构化数据、例如  关系型数据库
- 半结构化数据 、 HTML 、 XML 、 JSON 
- 非结构化数据

### SQL（结构化查询语言）命令 

>  关系型数据库擅长处理 结构化数据 、可以通过 结构化查询语言 对数据 进行 CRUD (增删改查)

- DDL  (数据定义语言) ：  主要包含的命令 有   create 、  drop 、 alter 、truncate 、show 
- DML  (数据操纵语言)  :   主要包含的命令有   insert  ,   update ,   delete
- DQL  (数据查询语言)  :   主要 包含的 命令是   select 
- DCL  (数据控制语言)  :   主要包含的命令是  grant  、revoke

###  数据库 database 的 操作 

- 查询 当前 数据库管理系统 DBMS 下 有哪些 Database 数据库

  ```mysql
  show  databases  [ like  '%x%' ] ;
  ```

- 新建一个数据库  database

  ```mysql
  create database [if not exists]  <databaseName> ;
  ```

- 删除 指定的数据库 

  ```mysql
  drop database [if exists] <databaseName> ;
  ```

- 切换数据库

  ```mysql
  use <databaseName>
  ```

### MySQL数据库支持的数据类型

| MySQL                   | Java                 | 说明                                               |
| ----------------------- | -------------------- | -------------------------------------------------- |
| tinyint                 | byte                 | 占用1个字节的整数                                  |
| smallint                | short                | 占用2个字节的整数                                  |
| int / integer           | int                  | 占用 4个字节的整数                                 |
| bigint                  | long                 | 占用8个字节的整数                                  |
| float / double(11,   1) | float / double       | 小数类型, 可以指定有效长度 和 保留小数位           |
| bool  /  boolean        | boolean              | 真和假                                             |
| decimal(n,  m)          | BigDecimal           | 高精度小数，  n 代表有效长度， m 代表 保留小数位数 |
| char(11)                | String               | 固定长度的字符串、                                 |
| varchar(11)             | String               | 可变长度的字符串，括号中限定最大长度               |
| text  /  longtext       | String               | 存储超大文本字符串                                 |
| enum('a',  'b' ,  'c')  | String               | 定义一个枚举 类型，通过 括号中的内容 限定值        |
| date                    | Date /  LocalDate    | 用来存储日期的类型，存储格式为 yyyy-MM-dd          |
| datetime                | Date / LocalDateTime | 用来存储日期和时间的类型                           |
| time                    | LocalTime            | 用来存储时间的类型                                 |
| blob  / longblob        | byte[]               | 用来存储 二进制流数据                              |

### 表的基本操作 

- 创建表

  ```mysql
  create  table [if not exists] <tableName> (
  
      <columnName>  <columnType>  [constraints]  [comment] , 
      ...
      <columnName>  <columnType>  [constraints]  [comment] 
  ) ;
  ```

- 删除表

  ```mysql
  drop table [if exists] <tableName> ;
  ```

- 修改表结构  alter  table 

  - 添加字段

  ```mysql
  alter table <tableName> add [column]  <columnName>  <columnType>  [constraints] [comment] ;
  ```

  - 删除字段

  ```mysql
  alter table <tableName>  drop [column]  <columnName> ;
  ```

  - 修改字段名

  ```mysql
  alter table <tableName> change <oldName>  <newName> <columnType> [constraints] [comment] ;
  ```

  - 修改 字段类型

  ```mysql
  alter table <tableName> modify <columName>  <columnType> [constraints] [comment] ;
  ```

  - 修改表 名

  ```mysql
  alter table <tableName>  rename to <newTableName> ;
  
  rename table <tableName>  to  <newTableName>  ;
  ```

- 查看 当前 database 下所有的表 

  ```mysql
  show  tables ;
  ```

- 查看 表结构 

  ```mysql
  desc <tableName>   |  describe <tableName> ;
  ```

- 查看 建表语句 

  ```mysql
  show  create table <tableName> ;
  ```

###  DML 语句 

> 对数据 进行 增、删、改 操作 

- 插入 命令  

  ```mysql
  -- 插入值的个数 必须和 字段定义的个数相同 且 顺序 一致
  insert into <tableName>  values (val ...) ;     /* 不推荐使用 */
  
  insert into <tableName>(col1 , col2 , ...) values(val1,  val2 , ...) ;
  
  -- 批量插入 
  insert into <tableName>(col1, col2, ...) values (val1, val2 , ...) , (val1, val2, ...) ... ;
  ```

- 修改 命令 

  ```mysql
  update <tableName> set <columnName> = val , ...  [where <condition>] ; 
  ```

  > 在 使用 更新命令的时候，如果 不带 where 条件，那么会 全表更新， 所以往往 更新 语句 都会添加  where 条件 。 

- 删除命令 

  ```mysql
  delete  from <tableName>  [where <condition> ] ;
  
  truncate table <tableName> ;  -- 截断表，删除表中所有的数据和占用的空间， 该命令是属于 DDL 命令 
  ```

> 在使用 删除 命令的时候， 如果不带 where 条件， 那么 会删除 表中所有的数据 、往往 删除语句 都会添加 where 条件 。 
>
> 如果 要删除 表中所有的数据 ，推荐使用  `truncate table <tableName>`  命令

<br/>

#####  delete 和 truncate 的区别 

1. delete 可以 按照 条件 删除 、 truncate 不能 删除 指定的数据 
2. delete  删除 表中所有的数据时 只删除 删除，而不删除 数据所占用的空间 ，  truncate 是 删除数据和 占用的空间 
3. delete  属于 DML 语句 ，在 操作的时候，可以 在 事务环境中 执行 。  而  truncate  不会 进行 事务 管理

####  where 条件 查询 

1. 关系 条件查询

```mysql
> ,   >=  ,   < ,   <=  ,   =  (等于) ,   <> (不等于) ,  !=  (不等于)   
```

2. 逻辑条件查询

```mysql
and (与) ,  or (或) 
```

3. 模糊条件查询

```mysql
关键字 like  
模糊查询的 符号 有 
 %  :  匹配 0 ~ N 个字符 
 _  :  匹配 1个 字符 
 
 
select * from user where name like '%三%' ;
```

4. 区间条件查询

```mysql
between ... and 

-- 查询 成绩 在 70  ~ 80 之间的 所有 学生信息 
select * from student where score between 70 and 80 ;
```

5. 枚举条件查询  in

```mysql
-- 查询 名字 为 张三 、 李四 、 王五 的学生信息 

select * from student where name in ('张三', '李四' , '王五')
```

6. 空值条件查询

```mysql
-- 查询 性别 为 空的 学生信息 
select * from student where gender is null ;

-- 查询 性别 不为空的学生信息 
select * from student where gender is not null ;
```

<br/>

### 数据库约束类型 

- 主键约束  primary  key   ：  在 整个表中， 唯一且非空 ！ 一张表 最多只能设计 一个主键约束  
- 唯一约束  unique  :    值不允许重复、但可以为空 
- 非空约束  not null  :    限定值 不允许为 空 ， 默认 字段 采用 允许 为 null 
- 默认约束  default  :   设置 默认值 ， 如果在插入的时候，没有插入该值，则取默认值
- 检查约束  check  :   MySQL 暂不支持该约束 
- 外键约束  foreign key  :   用来描述 数据与数据 、 表与表 之间的 关系

>  一张表 中 不是 约束定义的越多越好 ，因为 约束 会增加数据库的 负担、应该给一些 关键的 字段 添加合适的约束 

<br/>

### 数据库的范式

>   数据库的范式要求 指的是  在 建表的时候 需要遵循的原则 和 规范 ~~~~ ，  关系型数据库有 6 大范式 ，通常 在设计的时候只需要遵循数据库三范式即可。
>
>   范式 是 为了 减少 数据库 的 数据冗余  

<br/>

- 第一范式：  表中 字段 不可拆分 ， 关系型数据库设计的表 全部 遵循 一范式 
- 第二范式： 表中 必须 提供一个 主键  
- 第三范式 ：表中的 字段 必须 和 表中的 主属性 有 直接关系，而不能是 间接关系

<br/>

###  数据库表与表之间的关系 

- 一 对 一 关联关系  :  

- 主键  +  外键  + unique

  ```mysql
  create table tb_user_info(
     id bigint primary key auto_increment , 
       
       realName varchar(20) comment '真实姓名', 
       cardNo varchar(18) comment '身份证号' , 
       photo varchar(100) comment '用户头像' ,
       birth date comment '出生日期' , 
       
       user_id bigint unique comment '用户ID',
       
       -- 添加一个外键约束 
       constraint tb_user_info_user_id_fk foreign key(user_id) references tb_user(id)
  );
  ```

- 共享主键 

  ```mysql
  create table tb_user_info(
      id bigint primary key , 
       
       realName varchar(20) comment '真实姓名', 
       cardNo varchar(18) comment '身份证号' , 
       photo varchar(100) comment '用户头像' ,
       birth date comment '出生日期' , 
  
       -- 添加一个外键约束 
       constraint tb_user_info_user_id_fk foreign key(id) references tb_user(id)
  );
  ```

- 一 对 多 关联关系  :  

  ```mysql
  create table tb_address (
     id bigint primary key auto_increment , 
       name varchar(50) comment '收货人', 
       pro varchar(20) comment '省份',   
       city varchar(20) comment '城市', 
       country varchar(20) comment '区县', 
       detail varchar(50) comment '详细地址', 
       tel varchar(11) comment '联系方式' , 
       user_id bigint comment '用户ID' , 
       -- 添加外键约束 
       foreign key(user_id) references tb_user(id)
  );
  ```

- 多 对 多 关联关系 ：

  ```mysql
  create table tb_role(
     id bigint primary key auto_increment , 
       name varchar(100) comment '角色名' , 
       description text comment '角色描述'
  ); 
  ```

  - 中间表 +  2个外键  + 主键

    ```mysql
    create table tb_role_user(
       id bigint primary key auto_increment ,
         role_id bigint comment '角色Id', 
         user_id bigint comment '用户ID', 
         foreign key(role_id) references tb_role(id), 
         foreign key(user_id) references tb_user(id)
    ) ;
    ```

  - 中间表  + 2 个外键 + 联合主键

    ```mysql
    create table tb_role_user(
         role_id bigint comment '角色Id', 
         user_id bigint comment '用户ID', 
         foreign key(role_id) references tb_role(id), 
         foreign key(user_id) references tb_user(id), 
         -- 联合主键
         primary key(role_id, user_id) 
    ) ;
    ```

###  数据与数据之间的关系 

> 在 一张表中， 数据之间 也可能会 存在 一对多 的关联关系 
>
> ```mysql
> create table tb_employee(
>  id bigint primary key auto_increment , 
>  name varchar(50) comment '员工名称', 
>  job  varchar(20) comment '职务' ,
> pid bigint comment '上级ID' , 
>  foreign key(pid) references tb_employee(id) 
> );
> ```

## 查询命令 

- 简单查询


  - select  简单查询 

    ```mysql
    select  1 ;  -- 往往用来做数据库心跳检测
    
    select user() ;  -- 获取当前登录的用户信息
    
    select version() ;  -- 获取数据库的版本号
    
    select now() ;  -- 获取 当前系统时间 
    
    select last_insert_id() ;  -- 获取最后插入的主键(必须是自增)
    
    ```

  - 基于表查询 

    ```mysql
    select  <columnName> , ....  from  <tableName> ; 
    
    select * from <tableName>  ;  -- 查询 表中所有的字段 ， 在生产环境中 不推荐使用 * 查询所有字段 
    ```

  - 基于条件的查询 

    ```mysql
    select  <columnName> , ... from <tableName>  where <condition> ;
    
    select * from tb_user where name = 'admin'  ;  --  查询的时候 name的值 不区分大小写 
    
    select * from tb_user where binary name = 'admin' ;  -- 查询的 name 值 区分大小写 
    ```

  - 基于分组的查询 

    - count() :  用来 统计 个数

      ```mysql
      --  查询 学生表中 有多少个 学生 
      
      select count(*)  from  student ;  -- 以行为单位 ，统计有多少个学生
      
      select count(stuNo) from student ; -- 根据学号 来统计 有多少个学生
      
      select count(1) from student ;  -- 根据常量值 进行统计、如果有值，个数 + 1 
      ```

      >   从性能上 、  count(1 )  >  count( * ），  count(column)  只统计该列中 值不为  >   null 的 行数(null不参与统计) 。
      >
      >   如果 count(column) 中的 column 中的列 有索引，那么性能 会 比 count(1) 高 、 如果 >   没有索引，性能  比 count(*) 还低

    - sum()  :  求和    

      ```mysql
      -- 查询学生的总成绩 
      select sum(score) from student ;  -- sum 函数 参数 只能传入 字段名，  字段列中对应的 null 不参与 求和
      ```

    - avg() :  求平均值 

      ```mysql
      -- 查询学生 的平均成绩 
      select avg(score) from student ;  -- sum 函数 参数 只能传入 字段名，  字段列中对应的 null 不参与 求平均值
      
      
      select  avg ( ifnull(score,  0) ) from student ;  -- 字段列对应的 null, 则 取 0 ， 仍旧参与 求 平均值 
      ```

    - max() :  求最大值 

      ```mysql
      -- 查询 最高分 
      select  max(score) from student ; 
      ```

    - min() :  求最小值 

      ```mysql
      -- 查询 最低分 
      select min(score) from student ;  -- 空值不参与 求 最小值 
      ```

  - group by 实现 分组查询 

    ```mysql
    -- 查询 不同 性别的 学生人数 
    select  sex,  count(1) from student group by sex ;
    ```

  >  group by 分组 对查询的 列 有 要求 ，  要么 查询的 列 是一个 聚合 列 、要么 出现 在 group by 的 后面，作为分组依据。
  >
  >  - having 分组 筛选   
  >    对分组后的结果 进行过滤 、筛选，  having 是 基于 group by 存在 的。
  >
  >  ```mysql
  >  -- 查询 班级中 同名 、同性别 的 学生名 和 性别
  >  select name, gender from student group by name ,gender having count(1) > 1 ;
  >  ```

    where  和  having 的区别

      1. where  是 对 表中的 数据 进行筛选 ，  having  是 对 分组后的 结果 进行 筛选 。
      2. where  和  having  如果 同时 存在 ，那么  where 先筛选  再分组  再过滤
      3. where 条件 中 不能使用 聚合函数 、但 having 可以使用 聚合函数 
      4. 能用 where 筛选过滤的数据 、尽量不要用 having  筛选

  - 数据排序  order  by 

    ```mysql
    -- 查询 所有的学生信息 、按照 成绩降序排列，当成绩相同的时候 ，按照 出生日期 降序排列 
    select * from student order by score desc , birth desc  ;
    ```

    > 当 有多个字段 参与排序的时候， 优先根据 第一个排序的字段 进行排序，当 第一个字段 的值  相同的时候，才会根据第二个字段的值进行排序、依此类推。 

  - 分页查询  limit  

    ```mysql
    select * from student  limit 3 ;  -- 查询表中 前 3 条数据 
    
    select * from  student  limit  10 ,  3  ;  -- 查询表中 从 第 11条数据开始 3 条数据 
    
    select * from  student limit 10 offset 3 ;  
    ```

    >  分页查询的时候， 如果 包含  order by , 那么 建议根据  唯一键 进行排序 、如果 根据 的字段值有大量的重复、建议 使用 多个字段排序 ， 否则 会出现 分页数据紊乱 。

- 子查询

  - 基于 列 的 子查询   (当查询的列需要一个单独的SQL进行查询的时候)

    ```mysql
    select u.username , u.password, u.tel , 
            (select f.realName from tb_user_info as f where f.id = u.id) as realName 
    from tb_user as u where u.id = 12 ;
    ```

    >  子查询必须添加 小括号 ，  基于列的 子查询 查询的 结果 必须 满足 单列  单值

  - 基于 表的 子查询  (嵌套查询)

    >  将一个查询的结果 作为一张表 、继续 进行查询 。查询的结果 需要设置一个别名，作为 临时表的 名称 ！

  - 基于 条件的 子查询 

    - 等值 条件子查询  （子查询 返回 单列 单值）

      ```mysql
      -- 查询 班级 中 成绩 最高的 学生 信息 
      select * from student where score = (select max(score) from student);
      ```

    - 关系条件子查询  （子查询 返回 单列 单值、如果子查询返回单列多值、可以使用  any ,  all  来处理 ）

      ```mysql
      select * from student where score > (select max(score) from student);
      ```

    - in 子查询   (子查询 返回 单列 多值) 

      ```mysql
      -- 查询 同名的学生信息 
      select * from student where name in (
      
          select name  from student group by name having count(1) > 1
      
      )
      ```

    - exists 子查询

      ```mysql
      -- 查询 学生中 同名, 同性别 学生信息 
      
      select * from student t where exists (
          select 1 from student f 
              where t.name = f.name and t.gender = f.gender
          group by f.name, gender having count(1) > 1
      );
      ```

- 关联关系查询

  > 关联关系 查询 主要 解决的是  表与表之间的 关联关系 
  >
  > - 左外连接   left  [outer]  join   ....  on 
  > - 右外连接  right [outer] join   .... on
  > - 内连接    [inner]  join  ....  on 
  >
  > ```mysql
  > select u.*,  d.id as aid , d.name ,d.pro, d.city, d.country, d.detail , d.tel as atel ,  r.name as roleName
  >  from tb_user u inner join tb_address d on u.id = d.user_id 
  >  left join tb_role_user ur on ur.user_id = u.id 
  >  left join tb_role r on r.id = ur.role_id 
  > ```

     where u.username = 'admin' ;

    ```
  
    ```

- 集合查询

  > 集合 查询 指的是 将 2个 或者 多个 查询 的结果 合并为  一个结果 
  >
  > ```mysql
  > select  gender ,count(1) as y from java2302.student where gender = 'm' 
  > union all
  > select gender , count(1) as y from java2302.student where gender = 'f' 
  > ```
  >
  > - union all  :  并集不去重
  > - union  :  并集去重

  **两个或多个查询 、查询的个数必须一致、合并的列含义应该相同**

- with查询

  >  with 用来 定义 临时表 、借助 临时表 可以完成 复杂的 SQL语句编写 。

  ```mysql
  with temp as (
      select t.*, c.class_name from tb_student t 
    left join tb_class c on t.class_id = c.id 
  ),
  temp2 as (
      select t.*, s.name as subject_name, s.id as subject_id from tb_teacher t 
      left join tb_subject s on t.id = s.teacher_id  
  )
  select distinct t.* from temp t 
  left join tb_score s on t.id = s.stu_id 
  left join temp2 as k on k.subject_id = s.subject_id 
  where t.name = 'AAA' ;
  
  ```

- with  recursive  递归查询     

  ```mysql
  -- 查询 部门名为 奇酷网络科技有限公司 及其 它下的 所有子部门
  with recursive depart as (
      
       select * from tb_depart where pid is null and depart_name = '奇酷网络科技有限公司'
       
       union  
       
       select  d.*  from tb_depart d 
              inner join depart p on d.pid = p.id 
  )
  
  select * from depart 
  ```

<br/>

### 常见的函数 

- 日期函数 

  - now() :  当前系统时间

  ```mysql
  select  now(); 
  ```

  - date_add()  :   添加 时间

  ```mysql
  select date_add(now(),  interval 18 year) ; 
  ```

  - date_sub() : 减少时间

  ```mysql
  select date_sub(now(),  interval 18 month) ;
  ```

  - datediff()  :  计算两个日期间隔、返回天数

  ```mysql
  select datediff(now() ,  birth)  from student ; 
  ```

  - date_format() : 格式化日期

  ```mysql
  select  date_format(now(),  '%Y-%m-%d %H:%i:%s') ;
  ```

  - year()  : 获取 年份 
  - month() : 获取月份

- 数学函数 

  - abs(n)  :  绝对值 
  - ceil(n)  :  向上取整 
  - floor(n) : 向下取整 
  - round(n,  x) :  四舍五入保留 x 位小数
  - pow(x, y) :   获取 x 的 y次幂

- 字符串函数 

  - concat(a,  b , ...)  :  将 多个字符串 拼接起来 
  - concat_ws(sep,  a,  b,  ...)  ： 将多个字符串 以 指定的分隔符 sep  进行 拼接 
  - group_concat( [distinct]  columName  [order by columnName asc|desc ]  [separetor  sep] )  :  将 多行内容 以指定的分隔符进行拼接，默认使用  逗号 进行 拼接
  - substring(str,  pos ,  len)  :  从 指定的字符串  pos 位置 开始 截取 指定的长度 ， pos 从 1 开始  
  - replace（str ,  oldstr,   newstr） :  将 指定的 字符串str 中 的 oldstr 替换为  newstr 
  - upper / ucase   :  将字符串转换为 全大写
  - lower / lcase : 将字符串转换为 全小写 
  - trim / ltrim / rtrim :  去除 (左/右) 空格
  - length  : 获取 字符串的 字节长度、 一个中文 在  UTF-8编码下 占用 3个 字节 
  - char_length ：  获取 字符串的 长度 
  - instr(str,   sub)  :  获取  sub 在 str 字符串中第一次 出现的位置，从 1开始 
  - left  /  right (str,   len)  :  从 左边 /右边  截取 指定长度 的 字符串 
  - lpad  / rpad (str,  len  ,  word)  :   将 字符串 str  左补/右补  len 长度 ， 使用 word 单词 进行填充， 如果 指定的长度  小于 原始内容长度，则繁盛 从左 截取 指定的 len 个长度

- 判断函数  

  - ifnull(x ,  val)  :   如果  x 的值 为 null ,  则 取  val ,  给  x  设置 默认值 

  - if (bool ,    x,   y )  :    如果  bool  返回 真 ，则 取  x   否则 取  y ,  （等价于 三元运算符 ）

  - case  when  ...   

    ```mysql
    select score,  
        case 
            when score >= 90 then '优秀' 
            when score >= 80 then '良好'
            when score >= 70 then '中等'
            when score >= 60 then '及格'
            else '不及格'
        end as level 
        
     from student ;
     
     
    select score,  
        case floor(score / 10)
            when 9 then '优秀' 
            when 8 then '良好'
            when 7 then '中等'
            when 6 then '及格'
            else '不及格'
        end as level 
     from student ;
    ```

- 加密函数  

  - md5  :    采用 hash 混淆算法，该算法是不可逆的 (只能加密不能解密) 、网站中的密码通常会采用 MD5加密 

    > MD5 密文 是 由  16进制 组成的 32位长度的 字符串 、相同的字符串 加密后结果 一定相同 ~ 
    >
    > MD5 可以通过 彩虹对照表  的手段 进行 简单密码的 暴力 解密

## 视图  View 

视图  是 表的映射 、是一张 虚表 、它本质上 是 一个  SQL  查询命令  ， 他的主要作用 有2个， a)  简化查询 、   b) 能够在一定程度上保证数据的安全。 

```mysql
create view v_student as 
    select s.*,  c.class_name from tb_student s left join tb_class c 
    on s.class_id = c.id ;
```

## 索引  index

> 是为了提供 查询的效率 

### 索引的结构  

- B-tree索引 ： 适用于单列或多列的查找、排序和范围查询 。MySQL默认使用的索引类型
- 哈希索引 :   适用于等值查询，将值存储在哈希表中，可以快速定位特定的数据行。但哈希索引不支持排序、范围查询或部分匹配查询。

### 创建索引 

```mysql
create [unique]  index  索引名  on <tableName>(column...) [using hash] ;

-- 创建一个 普通索引  
create index  tb_user_birth_index on tb_user(birth) ; 

-- 创建一个 唯一索引 
create unique index tb_user_username_index  on tb_user(username) ; 

-- 创建一个 组合索引  
create index tb_user_username_birth_index on tb_user(username,  birth) ; 

-- 创建一个 哈希 索引 
create index tb_user_sex_index_hash on tb_user(sex) using hash; 

```

### 删除索引 

```mysql
drop  index  索引名 ; 
```

### 什么字段适合添加索引 

1.   主键、 唯一键、外键  （如果添加了对应的约束、那么该字段默认已添加 索引）
2.   该 字段 对应的 值 重复率 不高 
3.   经常出现在 where 条件上的 字段  适合 添加 索引 
4.   需要 排序的 字段 可以 添加 索引 

<br/>

### 索引失效的情况 

1. `>=`  ,     `!=`   

2. 前模糊
3. is  not  null
4. 字段 类型不一致 发生 隐式转换 
5. 字段上使用 函数 
6. 组合 索引  采用 最左原则 ， 如果不满足该原则， 索引也会失效 

 分析 SQL 性能：  explain 

**索引类型优到劣： 从system到const到eq_ref到ref到range到index到all。	查询的type类型越好，查询速度越快。**

<br/>

### btree 和 b+tree的区别

1、btree的关键字和记录是放在一起的，叶子节点可以看作外部节点，不包含任何信息；b+tree的非叶子节点中只有关键字和指向下一个节点的索引，记录只放在叶子节点中。

2、在btree中，越靠近根节点的记录查找时间越快，只要找到关键字即可确定记录的存在；而b+tree中每个记录的查找时间基本是一样的，都需要从根节点走到叶子节点，而且在叶子节点中还要再比较关键字。 

## 事务 transcation

###  什么事务 

事务是为了保证一个`业务操作`的完成性， 一个业务操作 要么 全部成功 、要么 全部失败 、不允许部分成功、部分失败。

###  事务的四大特性 ACID 

- A   原子性  ：  保证业务 是一个 不可再分的 基本操作 
- C   一致性 :    事务的最终目的 就是 为了 保证 数据库 中 数据的一致性 ，即  事务前后 数据是 一致的 ~
- I   隔离性 :    数据库在 事务环境 中 会给 每一个业务 开辟一个 缓存区 、缓存区 与 缓存区 的 隔离 机制  就是 数据库的 隔离性
- D  持久性 ：  保存 存储在数据库中的数据  具备  持久化(永久性存储) 功能 

### 事务的隔离级别 

- uncommited read   读未提交 ：   可以 读取  另一个 事务  未提交的数据 
- commited read  读已提交  （Oracle 数据库的默认隔离级别）:    
- repeatable read   可重复读 (MySQL 数据库默认隔离级别) :   通过 锁行 解决 不可重复读 问题 
- serializable  read  序列化读 :    通过 锁表 解决 不可重复读的问题 

### 隔离级别产生的问题 

-  脏读 ： 读取  另一个 事务  未提交的数据 ，这种现象 被称为 脏读 （脏读是 一种非常严重的问题，通常数据库不允许出现脏读现象）
-  不可重复度 ： 在一个 事务  二次 读取 同一条记录的时候，  另一个事务 对该条记录 进行了修改， 导致 2次 读取的 结果不一致 
-  幻读 :   在一个 事务  二次 读取 总数量的数量， 另一个事务 在 期间 新增了 一条 记录 、导致 2次 读取 的数量不一致 

| 隔离级别/问题 | 读未提交 | 读已提交 | 可重复读 | 序列化读 |
| :------------ | -------- | -------- | -------- | -------- |
| 脏读          | √        | ×        | ×        | ×        |
| 不可重复读    | √        | √        | ×        | ×        |
| 幻读          | √        | √        | √        | ×        |

##  MySQL 数据库 账户  

>  MySQL数据库 超级管理员是  root 账户 ，  MySQL数据库下的 所有用户信息 都在 mysql 数据库下的  user 表中存储 

### User 表 中 重要的 字段 

-  host :   存储 允许 连接数据库 的 IP 地址 ， localhost 代表 该账户 只能在 本机连接 、如果 希望 能够 远程 连接数据库， 则 需要将 该值 设置 为  `%`
-  user :   存储 登录 的 账号 
-  ***_priv :  当前用户 所拥有的操作权限 
-  max_connections :  当前用户允许的最大连接数、如果 为 0 ，代表没有限制 
-  plugin ：  密码采用的加密机制 ，mysql8.x 的默认值是 caching_sha2_password ， mysql 5.x  默认是 mysql_native_password 
-  authentication_string :  当前账户的密码， 存储的是 密文， 如果没有密码，则设置为 空字符串 
-  password_expired :  密码是否 已经过期 
-  password_lifetime :  密码的 存活时间 
-  account_locked  :  账号是否已禁用     

### MySQL 数据库用户 

- 创建用户 

  ```mysql
  create  user <userName>[@host]  identified by '密码' ; -- 当没有使用 @host,  默认 host 为  % 
  ```

- 删除用户 

  ```mysql
  drop  user  <userName>[@host] ;
  ```

- 修改 密码

  ```mysql
  alter user <username>[@host] identified by 'password' ;
  ```

- 锁定账号 / 解锁 账号 

  ```mysql
  alter user <username>[@host] account lock /  unlock ;
  ```

<br/>

## DCL

>  数据控制语言，用来 给用户 赋予 操作 权限 的命令 

###  授权  

```mysql
grant  <权限列表>  on  <databaseName>.<tableName>  to <userName>[@host] ;
```

> 权限列表 例如  select ,  update,  delete,  insert , create , drop .... ,   如果要授予 所有权限， 可以使用  all  替代 。
>
> databaseName  和  tableName  可以 使用 *  表示所有。
>
> 多个权限列表使用 逗号分隔 。

### 取消授权 

```mysql
revoke <权限列表>  on <databaseName>.<tableName>  from <userName>[@host] ; 
```

### 刷新权限

```mysql
flush privileges ;
```

**如果给所有的数据库授予所有的权限，例如 grant all  on  `*.*`  to test@'%' , 那么 root账号无法直接撤销授予的权限，需要 给root设置 system_user权限才可以。  grant  system_user on `*.*` to root@'%'  **

## MySQL数据库引擎 

- InnoDB （MySQL5.7 以后的默认引擎）： a)  支持 事务管理 、  b)  支持 行级锁  、 c)  支持 外键约束 
- MyISAM   :   性能相对较高 、但不支持 事务、行级锁、外键  
- MEMORY  ：  采用 hash 算法 存储在 内存的 临时表

## 备份数据库 

```mysql
mysqldump  -u <username>  -p  <databaseName>  [<tableName> ...]  >  a.sql 
```

<br/>

## 如何找回 root 账户密码 

1. 关闭 mysql 服务器

   ```mysql
   net stop mysql
   ```

2. 跳过 mysql 的 权限 检查 、启动 mysql 数据库 

   ```
   mysqld  --skip-grant-tables  --console  --shared-memory
   ```

3. 使用 无密码 方式 登录 到数据库中 

   ```mysql
   mysql  -uroot  -p 
   ```

4. 编写 修改 命令，将 内置 root 账户 密码设置为 "" 空字符串 

   ```mysql
   update mysql.user set authentication_string = ''  where user = 'root' ;
   ```

5. 刷新 权限 

   ```mysql
   flush  privileges ;
   ```

6. 关闭 第二步  mysqld 开启的 服务   CTRL  + C   ,   通过 CTRL + SHIFT + ESC  打开任务管理器 ，结束 mysqld  进程 

7. 正常启动 mysql 数据库 

   ```mysql
   net  start mysql
   ```

8. 使用 无密码 方式 登录 到数据库中 (已经将密码重置为 空字符串)

   ```
   mysql  -uroot  -p
   ```

9. 链接数据库成功后，  修改 root 密码 

   ```mysql
   alter user  root@'localhost' identified by '新密码' ;
   ```


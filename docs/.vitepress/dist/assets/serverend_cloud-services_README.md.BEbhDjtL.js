import{_ as s,a,b as i,c as e,d as t,e as l,f as p,g as o,h as n,i as r,j as h,k as c,l as d,m as k}from"./chunks/image-20210621163323512.CVC1mHgh.js";import{_ as g,a as u}from"./chunks/image-20210621155425769.D03vGsq3.js";import{_ as b,c as F,o as m,a3 as f}from"./chunks/framework.Kdal2JsX.js";const S=JSON.parse('{"title":"说明","description":"","frontmatter":{},"headers":[],"relativePath":"serverend/cloud-services/README.md","filePath":"serverend/cloud-services/README.md"}'),_={name:"serverend/cloud-services/README.md"},q=f('<h1 id="说明" tabindex="-1">说明 <a class="header-anchor" href="#说明" aria-label="Permalink to &quot;说明&quot;">​</a></h1><blockquote><p>该笔记是本人购买<code>服务器</code>后,根据博客园<a href="https://www.cnblogs.com/xiaofanke/p/10428409.html" target="_blank" rel="noreferrer">萧凡客</a>关于<code>利用阿里云搭建frp实现外网远程桌面内网电脑相关操作</code>、CSDN的<a href="https://blog.csdn.net/cao0507" target="_blank" rel="noreferrer">曹灰灰</a>的<code>阿里云服务器实现 frp 内网穿透</code>实践后记录的笔记</p><p>主要应用场景：针对 ① 学生放假回家使用外网无法远程操作学校的服务器或者电脑 ② 工作后回家发现公司工作有部分未完成但需要内网才能有数据等</p><p>这里通过阿里云的云服务器(其他云服务器操作一致)搭建一个frp服务，实现内网穿透，从而可以直接通过远程桌面或者其他工具实现对校园网内的服务器或者电脑进行操作。</p></blockquote><h1 id="一、预先准备" tabindex="-1">一、预先准备 <a class="header-anchor" href="#一、预先准备" aria-label="Permalink to &quot;一、预先准备&quot;">​</a></h1><h2 id="_1、-购买云服务器及初步搭建" tabindex="-1">1、 购买云服务器及初步搭建 <a class="header-anchor" href="#_1、-购买云服务器及初步搭建" aria-label="Permalink to &quot;1、 购买云服务器及初步搭建&quot;">​</a></h2><blockquote><ol><li>购买服务器:推荐去买阿里或者腾讯云,如果是学生还特别便宜,不是学生就等节日活动买 --&gt;<a href="https://www.aliyun.com/1111/new?userCode=ntx4gz4v" target="_blank" rel="noreferrer"><code>点我传送</code></a></li><li>搭建云服务器(其实就是购买时选择的那些)，设置系统和登录密码。这里我选择的是ubuntu系统</li></ol><p>其实不同操作系统的云服务器在使用 frp 时操作都是一样的，就是<strong>下载</strong>，<strong>配置</strong>，<strong>运行</strong>。可能有区别的地方就是防火墙相关的配置，不同云服务厂商的镜像不同可能也有一些差别</p></blockquote><h2 id="_2、frp相关知识" tabindex="-1">2、frp相关知识 <a class="header-anchor" href="#_2、frp相关知识" aria-label="Permalink to &quot;2、frp相关知识&quot;">​</a></h2><h3 id="i-frp作用" tabindex="-1">Ⅰ- frp作用 <a class="header-anchor" href="#i-frp作用" aria-label="Permalink to &quot;Ⅰ- frp作用&quot;">​</a></h3><blockquote><ol><li>利用处于内网或防火墙后的机器，对外网环境提供 http 或 https 服务。</li><li>对于 http, https 服务支持基于域名的虚拟主机，支持自定义域名绑定，使多个域名可以共用一个80端口。</li><li>利用处于内网或防火墙后的机器，对外网环境提供 tcp 和 udp 服务，例如在家里通过 ssh 访问处于公司内网环境内的主机。</li></ol></blockquote><h3 id="ii-frp实现功能" tabindex="-1">Ⅱ- frp实现功能 <a class="header-anchor" href="#ii-frp实现功能" aria-label="Permalink to &quot;Ⅱ- frp实现功能&quot;">​</a></h3><blockquote><ol><li>外网通过ssh访问内网机器</li><li>自定义绑定域名访问内网web服务 (必须需要公网服务器绑定域名)</li></ol></blockquote><h3 id="iii-frp下载说明" tabindex="-1">Ⅲ- frp下载说明 <a class="header-anchor" href="#iii-frp下载说明" aria-label="Permalink to &quot;Ⅲ- frp下载说明&quot;">​</a></h3><blockquote><p>公网服务器与内网服务器都需要下载frp进行安装 --&gt;具体安装与使用步骤在下方</p><p>这是下载地址的<code>github页面</code>,可以自行前往查看 --&gt; <a href="https://github.com/fatedier/frp/releases" target="_blank" rel="noreferrer"><code>点我传送</code></a></p><p><img src="'+s+'" alt="image-20210621151449648"></p><p>具体下载什么版本根据个人情况不同自行选择</p></blockquote><h1 id="二、服务器操作" tabindex="-1">二、<strong>服务器操作</strong>: <a class="header-anchor" href="#二、服务器操作" aria-label="Permalink to &quot;二、**服务器操作**:&quot;">​</a></h1><h2 id="_1、远程登录系统" tabindex="-1">1、远程登录系统 <a class="header-anchor" href="#_1、远程登录系统" aria-label="Permalink to &quot;1、远程登录系统&quot;">​</a></h2><blockquote><p>首先登录系统(可以从阿里云网页上直接链接,也可以用其他软件)</p></blockquote><h2 id="_2、服务器终端操作-linux系统为例" tabindex="-1">2、服务器终端操作(<code>Linux系统为例</code>): <a class="header-anchor" href="#_2、服务器终端操作-linux系统为例" aria-label="Permalink to &quot;2、服务器终端操作(`Linux系统为例`):&quot;">​</a></h2><blockquote><p>如果其他系统自行打开终端,但如window可以直接操作不用命令行(类似操作在下方客户端部分) --&gt;<a href="https://github.com/fatedier/frp/releases" target="_blank" rel="noreferrer">点我查看所有frp版本</a></p></blockquote><h3 id="i-下载frp压缩包" tabindex="-1">Ⅰ- 下载frp压缩包 <a class="header-anchor" href="#i-下载frp压缩包" aria-label="Permalink to &quot;Ⅰ- 下载frp压缩包&quot;">​</a></h3><blockquote><p>由于本人是<code>ubuntu</code>系统,所以进去就是终端,输入命令: --&gt;<a href="https://github.com/fatedier/frp/releases" target="_blank" rel="noreferrer">点我查看所有版本</a></p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#此命令是下载linux版本的软件,如果其他系统请自行选择</span></span>\n<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">wget</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> https://github.com/fatedier/frp/releases/download/v0.24.1/frp_0.24.1_linux_amd64.tar.gz</span></span></code></pre></div><p>运行示例: <img src="'+a+'" alt="示例"></p></blockquote><h3 id="ii-解压" tabindex="-1">Ⅱ- 解压 <a class="header-anchor" href="#ii-解压" aria-label="Permalink to &quot;Ⅱ- 解压&quot;">​</a></h3><blockquote><p>解压文件命令行(后面跟的使下载的版本)：</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">tar</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -zxvf</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> frp_0.24.1_linux_amd64.tar.gz</span></span></code></pre></div><p>截图示例<img src="'+i+'" alt="image-20210621152459522"></p></blockquote><h3 id="iii-重命名-方便后续命令行操作将其简化为frp" tabindex="-1">Ⅲ- 重命名(方便后续命令行操作将其<code>简化为frp</code>) <a class="header-anchor" href="#iii-重命名-方便后续命令行操作将其简化为frp" aria-label="Permalink to &quot;Ⅲ- 重命名(方便后续命令行操作将其`简化为frp`)&quot;">​</a></h3><blockquote><p>命令行</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mv</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> frp_0.24.1_linux_amd64</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> frp</span></span></code></pre></div><p>截图示例</p><p><img src="'+e+'" alt="image-20210621152556689"></p></blockquote><h3 id="iv-查看上述操作是否正确-可以跳过" tabindex="-1">Ⅳ- 查看上述操作是否正确(可以跳过) <a class="header-anchor" href="#iv-查看上述操作是否正确-可以跳过" aria-label="Permalink to &quot;Ⅳ- 查看上述操作是否正确(可以跳过)&quot;">​</a></h3><blockquote><p>先查看上述操作是否成功--&gt;输入<code>ls</code></p><p>截图示例<img src="'+t+'" alt="image-20210621152803465"></p></blockquote><h3 id="v-修改配置文件-frps-ini" tabindex="-1">Ⅴ- 修改配置文件 <strong><code>frps.ini</code></strong> <a class="header-anchor" href="#v-修改配置文件-frps-ini" aria-label="Permalink to &quot;Ⅴ- 修改配置文件 **`frps.ini`**&quot;">​</a></h3><blockquote><ol><li><p><code>注意</code>:此处需要先<code>cd frp</code>,再<code>vim frps.ini</code></p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> frp</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  #先进入到frp文件目录中</span></span>\n<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">vim</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> frps.ini</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  #在frp文件目录中找到frps.ini配置文件且进行修改</span></span></code></pre></div><p>截图示例<img src="'+l+`" alt="image-20210621154057587"></p></li><li><p>写入配置</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[common]</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#服务器开放的端口</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">bind_port</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 7000</span></span></code></pre></div><p>截图示例<img src="`+p+'" alt="image-20210621153748064"></p></li></ol></blockquote><h2 id="_3、云服务器管理平台操作-以阿里云为例" tabindex="-1">3、云服务器管理平台操作(<code>以阿里云为例</code>) <a class="header-anchor" href="#_3、云服务器管理平台操作-以阿里云为例" aria-label="Permalink to &quot;3、云服务器管理平台操作(`以阿里云为例`)&quot;">​</a></h2><blockquote><ol><li><p>此处以<code>阿里云旧版为例</code>(右上角可以切换新旧版本)</p></li><li><p>选择安全组配置 (也可以直接左侧导航栏菜单选择<code>安全组</code>)</p></li></ol><p><img src="'+g+'" alt="image-20210621155106316"></p><ol start="3"><li>点击出现的配置规则</li></ol><p><img src="'+u+'" alt="image-20210621155425769"></p><ol start="4"><li>添加安全组规则</li></ol><p><img src="'+o+`" alt="image-20210621155847288"></p><ol start="5"><li>至此云平台设置完成:<code>其实只是设置了安全组规则</code></li></ol></blockquote><h2 id="_4、在内网目标主机上运行客户端程序" tabindex="-1">4、在内网目标主机上运行客户端程序 <a class="header-anchor" href="#_4、在内网目标主机上运行客户端程序" aria-label="Permalink to &quot;4、在内网目标主机上运行客户端程序&quot;">​</a></h2><blockquote><p>此步通常是都配置完成后连接使用</p><p><strong>nohup</strong> :英文全称 no hang up（不挂起），用于在系统后台不挂断地运行命令，退出终端不会影响程序的运行。</p><p><strong>nohup</strong> 命令，在默认情况下（非重定向时），会输出一个名叫 nohup.out 的文件到当前目录下，如果当前目录的 nohup.out 文件不可写，输出重定向到 <strong>$HOME/nohup.out</strong> 文件</p></blockquote><blockquote><p><code>终端命令</code>:</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> frp</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  #进入到frp目录</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">nohup</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ./frpc</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -c</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> frpc.ini</span></span></code></pre></div><p><code>success</code>:查看 nohup.out 的信息</p><p><img src="`+n+`" alt="image-20210621164238908"></p><p>本质:其实就是服务器远程连接本地</p></blockquote><h1 id="三、客户端配置-个人-or-公司电脑-or-学校电脑" tabindex="-1">三、客户端配置(个人 or 公司电脑 or 学校电脑) <a class="header-anchor" href="#三、客户端配置-个人-or-公司电脑-or-学校电脑" aria-label="Permalink to &quot;三、客户端配置(个人 or 公司电脑 or 学校电脑)&quot;">​</a></h1><blockquote><p>此处默认是<code>window</code>系统,如果是linux,那就参考上面,如果服务端也是window,那么就按照这个来</p></blockquote><h2 id="_1、下载安装包、解压" tabindex="-1">1、下载安装包、解压 <a class="header-anchor" href="#_1、下载安装包、解压" aria-label="Permalink to &quot;1、下载安装包、解压&quot;">​</a></h2><blockquote><p>上面预先准备部分已经给出frp下载说明,不再赘述 --&gt;[点我传送](#Ⅲ - frp下载说明)</p></blockquote><h2 id="_2、然后配置frpc-ini文件" tabindex="-1">2、然后配置<strong>frpc.ini</strong>文件 <a class="header-anchor" href="#_2、然后配置frpc-ini文件" aria-label="Permalink to &quot;2、然后配置**frpc.ini**文件&quot;">​</a></h2><blockquote><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[common]</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">server_addr</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 你自己服务器端ip（公网ip）</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">server_port</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 7000</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> #对应服务器配置中的端口</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[ssh]</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">type</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> tcp</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">local_ip</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 自己电脑的ip</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">local_port</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 3389</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">remote_port</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 6000</span></span></code></pre></div></blockquote><h2 id="_3、客服端添加端口出站规则-将端口3389添加到出站规则中" tabindex="-1">3、客服端添加端口出站规则：将端口<strong>3389</strong>添加到出站规则中 <a class="header-anchor" href="#_3、客服端添加端口出站规则-将端口3389添加到出站规则中" aria-label="Permalink to &quot;3、客服端添加端口出站规则：将端口**3389**添加到出站规则中&quot;">​</a></h2><blockquote><p>控制面板--&gt;系统和安全--&gt;防火墙--&gt;高级设置--&gt;出站规则--&gt;新建规则--&gt;...</p><p><img src="`+r+'" alt="image-20210621161652103"></p></blockquote><h2 id="_4、在公网服务器上运行服务端程序" tabindex="-1">4、在公网服务器上运行服务端程序 <a class="header-anchor" href="#_4、在公网服务器上运行服务端程序" aria-label="Permalink to &quot;4、在公网服务器上运行服务端程序&quot;">​</a></h2><blockquote><p>在Dos中启动服务：win+R 输入cmd</p><ol><li>需要<code>先进入frp目录</code>后执行如下操作：--&gt;<code>换话说就是将自己暴露出去,使外界能远程</code></li></ol><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">nohup</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ./frps</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -c</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> frps.ini</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> # 在公网服务器上运行服务端程序</span></span></code></pre></div><p>运行示例:</p><p><img src="'+h+'" alt="image-20210621160445435"></p><ol start="2"><li><code>success</code>:查看 nohup.out 的信息， --&gt;如果安装<code>winsw</code>后日志存在<code>winse.out.log</code>中</li></ol><p><img src="'+c+'" alt="image-20210621165531525"></p><p><code>ps</code>:远程访问地址--(阿里云服务公网IP):6000(端口号，remote_port)</p></blockquote><h1 id="四、设置开启自启动客户端frpc" tabindex="-1">四、设置开启自启动客户端frpc： <a class="header-anchor" href="#四、设置开启自启动客户端frpc" aria-label="Permalink to &quot;四、设置开启自启动客户端frpc：&quot;">​</a></h1><blockquote><p>服务器一般不会经常重启，但是自己的电脑涉及到经常重启问题，所以需要设置<code>开启自启动客户端frpc</code>：</p><ol><li>下载 <code>winsw</code> : --&gt; <a href="https://github.com/kohsuke/winsw/releases" target="_blank" rel="noreferrer"><code>点我传送</code></a></li></ol><p>改名为winsw.exe，放到frp相同的目录里，并在同一个目录里创建一个utf8编码的文本文件，文件名是 winsw.xml，内容是</p><p><img src="'+d+`" alt="image-20210621162717132"></p><ol start="2"><li>**启动：**以管理员权限打开一个命令窗口，cd到frp所在目录，执行：</li></ol><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">winsw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">winsw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> start</span></span></code></pre></div><ol start="3"><li>卸载服务</li></ol><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">winsw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> stop</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">winsw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> uninstall</span></span></code></pre></div><ol start="4"><li>截图示例</li></ol><p><img src="`+k+'" alt="image-20210621163323512"></p></blockquote>',44),C=[q];function y(v,B,x,E,w,P){return m(),F("div",null,C)}const T=b(_,[["render",y]]);export{S as __pageData,T as default};
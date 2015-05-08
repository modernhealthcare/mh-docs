## Newscycle

### Newslists

<pre>
<code class="language-markup"> 
&lt;pbs:newslist objectclass="101" useobjects="1">
</code>
</pre>

### Caching


- [Building Templates Tips & Tricks](https://docs.newscyclesolutions.com/pages/viewpage.action?pageId=4883400)
- [Caching](https://docs.newscyclesolutions.com/display/Onl/Caching)
- [Tag Parsing Order](https://docs.newscyclesolutions.com/display/Onl/Tag+Parsing+Order)
- [Testing](https://docs.newscyclesolutions.com/display/Onl/Testing)
- [Global Variables](https://docs.newscyclesolutions.com/display/Onl/Global+variables)

Note that gloabl variables are only available on the parsing layer they are defined:

<pre>
<code class="language-markup">
&lt;pbs:macro name="global-vars1" before> 
&lt;pbs:!macro name="global-vars2" before"> 
&lt;pbs:macro name="example1"> 
&lt;pbs:!macro name="example2">
</code>
</pre>

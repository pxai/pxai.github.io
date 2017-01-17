<img src="http://www.pello.info/images/logo_vagrant.png" alt="Vagrant logo" title="Vagrant logo" />
<p>Vagrant is a virtual machines management tool that allows us to easily create, run, configure and
share customized virtual systems. The main goal of Vagrant is to provide a centralized way to
share preconfigured virtual machines for software developers. In development teams, all members
must share not only and up-to-date project source, but also the same system configuration: database
management systems, web servers, application servers, IDEs, development kits,... It is almost impossible
to keep them identical in each station, not to mention the same specific versions of each program needed.
Another issue that comes to mind if you have ever suffered this is when your system  crashed or you simply upgrade
your hardware, or some IDE requires the latest operative system from Redmond: you will start again from scratch 
installing all the components you need to have your environment ready to work. This is a sort of myth of sisyphus
adapted to coders.
</p>
<p>
Virtualization comes to the rescue! but this is not just about sharing a common virtual machine among
developers. Vagrant wraps the virtualization system, and so we are not necessarily tied to any of them.
Vagrant supports Virtual Box (easily available), VMWare and even Amazon EC2, is easy to get into it.
</p>

<h5>Up and running</h5>
<p>In two easy steps we init a vagrant machine (a default 64bit box) and then we just boot it with vagrant up. The
first time the box must be downloaded</p>
<pre class="brush: bash">
d:\vm\vagrant init hashicorp/precise32
...
d:\vm\vagrant up
</pre>
<p>The first command will create a Vagrant configuration file, nice and self-documented. This is how it looks like
in a windows host:</p>
<img src="http://www.pello.info/images/vagrant_snap.png" alt="Vagrant running" title="Vagrant running" />

<h5>Automated configuration</h5>
<p>Ok, we get a basic machine but what happens with the configuration. Vagrant can take advantadge of powerful
configuration tools suchs as <a href="http://www.getchef.com/solutions/configuration-management/">chef</a> and <a href="http://puppetlabs.com/">puppet</a>. 
These two deserve not a post but one book each. In a nutshell, this kind of software automates machine configuration;
for programming environments there are already tools that <a href="http://eugeniaperez.es/wordpress/2014/08/02/taking-your-tests-to-the-next-level-with-bdd/" title="great post">using declarative description you get code</a>.
In the same way, sysadmins now are able to deploy several servers perfectly configured in no time, just writing configuration (and shareable) files. That easy.
</p>

<h5>Going social</h5>
<p>Even developers communicate and share (code), but mainly between them, though. And so for development boxes. Officialy available
we have the <a href="https://vagrantcloud.com/">Vagrant Cloud</a>, were we can grab popular boxes with some rating
information included. It's very easy to join the cloud and create your own boxes. You'll just face one little problem, 
you must upload your box somewhere. Other reference site could be <a href="http://www.vagrantbox.es/">Vagrant Box</a>, with many different
linux flavors for you to pick. There are, also, other propietary boxes available.</p>


<h5>Educational purposes</h5>
<p>Maybe in a software development company or department you just the same kind of environment all the time.
But Vagrant could be a really great tool to use at school. Depending on the subjects students have to switch their
environments and they will drive you crazy because two of them don't have the latest JVM or the usual suspects don't know even
how to switch off their windows8. You could prepare one Vagrant box, perfectly configured for each subject, even for
each specific unit of the same subject. For example, preparing an Android development environment it's really a pain in the ass. 
Instead of stuffing one single machine with all the software you need, a good use of Vagrant could avoid conflicts
and guarantee that all students are using exactly the same environment. As easy as pie.
</p>

<p>It is not unusual that you try to learn something new and that leads you to learn many other things.
Here I have written a bunch of names to be aware of, and I hope that this post helps as a reminder for the near future.
Greetz 4 u.</p>





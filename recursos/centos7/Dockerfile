FROM centos:7

RUN yum -y install openssh-server

RUN yum install -y passwd

RUN useradd worker_redhat && \
	echo "jenkins" | passwd worker_redhat --stdin &&\
	mkdir /home/worker_redhat/.ssh && \
	mkdir /home/worker_redhat/.ssh/authorized_keys && \
	chmod 700 /home/worker_redhat/.ssh


RUN chown worker_redhat:worker_redhat -R /home/worker_redhat && \
    chown 600 /home/worker_redhat/.ssh/authorized_keys


RUN /usr/sbin/sshd-keygen > /dev/null 2>&1

CMD /usr/sbin/sshd -D

#!/bin/bash
	
#Empezar el loop
for a in 1 2 3 4 5 6 7 8 9 10 
do
	#if es igual a 8 que el loop descanse
	if [ $a == 8 ]
	then
		sleep 15
		echo "Ejecucion 8: debemos esperar $nombre"
	fi
	echo "Ejecucion numero $a"
done
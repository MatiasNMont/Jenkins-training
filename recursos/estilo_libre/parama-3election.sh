#!/bin/bash

if [ $AWS_PROFILE ] && [ $AWS_REGION ]
then
	echo "Desplegando en la region $AWS_REGION en la cuenta $AWS_PROFILE"
fi
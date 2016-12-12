#!/bin/bash

# couleurs
RED='\033[0;31m'
NC='\033[0m' # No Color

# générateur
GENERATOR='mkdocs'
GENERATOR_URI='http://www.mkdocs.org/'

# répertoires (doit etre le même que dans mkdocs.yml)
OUTPUT_DIR='./dist'

printf "${RED}---------------------------------------------------------------------\n${NC}"

# vérification si le binaire existe sur le poste
command -v ${GENERATOR} >/dev/null 2>&1 || { echo >&2 "I require ${GENERATOR} but it's not installed. Check ${GENERATOR_URI}. Aborting."; exit 1; }

# vérification de l'existant
if [ -d ${OUTPUT_DIR} ]
then
	echo "Suppression de la documentation actuelle ..."
	rm -rf ${OUTPUT_DIR}
fi

mkdir ${OUTPUT_DIR}

# génération de la documentation
echo "Génération de la documentation ..."
mkdocs build --clean

printf "${RED}---------------------------------------------------------------------\n${NC}"
printf "ATTENTION : N'OUBLIEZ PAS D'AJOUTER LA DOCUMENTATION GENEREE AU GIT :\n"
printf "${RED}---------------------------------------------------------------------\n${NC}"

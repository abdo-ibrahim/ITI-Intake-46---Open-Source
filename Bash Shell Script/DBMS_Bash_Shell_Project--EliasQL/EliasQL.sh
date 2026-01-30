#!/bin/bash

# basic colors for UI
RESET="\033[0m"
GREEN="\033[1;32m"
YELLOW="\033[1;33m"
RED="\033[1;31m"
CYAN="\033[1;36m"
BOLD="\033[1m"

echo -e "\033[1;38;5;51m"
echo "    ════════════════════════════════"
echo "    ______               ____    __ "
echo "   / ____/ (_)___ ______/ __ \  / / "
echo "  / __/ / / / __ \/ ___/ / / / / /  "
echo " / /___/ / / /_/ (__  ) /_/ / / /___"
echo "/_____/_/_/\__,_/____/\___\_\/_____/"
echo ""
echo "    ════════════════════════════════"
echo -e "  │ \033[1;32mEliasQL Shell \033[0m- \033[1;37mVersion 1.0.0   \033[1;33m│"
echo -e "  │ \033[1;32mAuthor: Abdulrahman Elias       \033[1;33m│"
echo "    ════════════════════════════════"

echo -e "\033[0m"

echo "Starting EliasQL Shell..."
mkdir -p EliasQL
cd EliasQL

function press_any_key() {
    echo ""
    read -n 1 -s -r -p "Press any key to continue..."
    echo ""
}

function main_menu() {
    clear
    echo ""
    echo -e "${CYAN}╔═══════════════════════════════════╗${RESET}"
    echo -e "${CYAN}║${RESET}        ${BOLD}MAIN MENU${RESET}                  ${CYAN}║${RESET}"
    echo -e "${CYAN}╠═══════════════════════════════════╣${RESET}"
    echo -e "${CYAN}║${RESET} ${YELLOW}1)${RESET} Create Database                ${CYAN}║${RESET}"
    echo -e "${CYAN}║${RESET} ${YELLOW}2)${RESET} List Databases                 ${CYAN}║${RESET}"
    echo -e "${CYAN}║${RESET} ${YELLOW}3)${RESET} Connect To Databases           ${CYAN}║${RESET}"
    echo -e "${CYAN}║${RESET} ${YELLOW}4)${RESET} Drop Database                  ${CYAN}║${RESET}"
    echo -e "${CYAN}║${RESET} ${YELLOW}5)${RESET} Exit                           ${CYAN}║${RESET}"
    echo -e "${CYAN}╚═══════════════════════════════════╝${RESET}"
    echo ""
    read -p "Choose an option: " choice

    case $choice in
        1) create_database ;;
        2) list_databases ;;
        3) connect_database ;;
        4) drop_database ;;
        5) echo -e "${GREEN}Exiting EliasQL Shell Goodbye!...${RESET}"; sleep 1; exit 0 ;;
        
        *) echo -e "${RED}Invalid option Try again${RESET}"; press_any_key; main_menu ;;
    esac
}

function create_database(){
    
    read -p "Enter database name: " dbName

    while [ -z "$dbName" ]; do
        echo -e "${RED}Database name cannot be empty. Please enter a name.${RESET}"
        read -p "Enter database name: " dbName
    done

    if [ -d "./$dbName" ]; then
        echo -e "${YELLOW}Database '$dbName' already exist${RESET}"
    else
        mkdir ./$dbName
        echo -e "${GREEN}Database '$dbName' created successfully.${RESET}"
    fi
    press_any_key
    main_menu
}

function list_databases(){
    clear
    if [ $(ls -1 | wc -l) -eq 0 ]; then
        echo -e "${YELLOW}No Database available.${RESET}"
        press_any_key
        main_menu
        return
    fi

    echo ""
    echo -e "${CYAN}╔═══════════════════════════════════╗${RESET}"
    echo -e "${CYAN}║${RESET}      ${BOLD}Available Databases${RESET}          ${CYAN}║${RESET}"
    echo -e "${CYAN}╠═══════════════════════════════════╣${RESET}"
    dbs=( $(ls .) )
    if [ ${#dbs[@]} -eq 0 ]; then
        echo -e "${YELLOW}║ No databases available.          ║${RESET}"
    else
        for db in "${dbs[@]}"; do
            printf "${CYAN}║${RESET} %-33s ${CYAN}║${RESET}\n" "$db"
        done
    fi
    echo -e "${CYAN}╚═══════════════════════════════════╝${RESET}"
    press_any_key
    main_menu
}
function list_databases_inside(){
    clear
    if [ $(ls -1 | wc -l) -eq 0 ]; then
        echo -e "${YELLOW}No Database available.${RESET}"
        press_any_key
        main_menu
        return
    fi

    echo ""
    echo -e "${CYAN}╔═══════════════════════════════════╗${RESET}"
    echo -e "${CYAN}║${RESET}      ${BOLD}Available Databases${RESET}          ${CYAN}║${RESET}"
    echo -e "${CYAN}╠═══════════════════════════════════╣${RESET}"
    dbs=( $(ls .) )
    if [ ${#dbs[@]} -eq 0 ]; then
        echo -e "${YELLOW}║ No databases available.          ║${RESET}"
    else
        for db in "${dbs[@]}"; do
            printf "${CYAN}║${RESET} %-33s ${CYAN}║${RESET}\n" "$db"
        done
    fi
    echo -e "${CYAN}╚═══════════════════════════════════╝${RESET}"
}

function connect_database(){

    list_databases_inside

    read -p "Enter database name to connect: " dbName

    if [ -z "$dbName" ]; then
        echo -e "${RED}Database name cannot be empty.${RESET}"
        press_any_key
        main_menu
        return
    fi

    if [ -d "./$dbName" ]; then
        echo -e "${GREEN}Connected to database '$dbName'.${RESET}"
        tablesMenu
    else
        echo -e "${RED}Database '$dbName' does not exist.${RESET}"
    fi
    press_any_key
    main_menu
}

function drop_database(){
    if [ $(ls -1 | wc -l) -eq 0 ]; then
        echo -e "${YELLOW}No Database available.${RESET}"
        press_any_key
        main_menu
        return
    fi

    echo -e "${CYAN}╔═══════════════════════════════════╗${RESET}"
    echo -e "${CYAN}║${RESET}      ${BOLD}Available Databases${RESET}          ${CYAN}║${RESET}"
    echo -e "${CYAN}╠═══════════════════════════════════╣${RESET}"
    dbs=( $(ls .) )
    if [ ${#dbs[@]} -eq 0 ]; then
        echo -e "${YELLOW}║ No databases available.          ║${RESET}"
    else
        for db in "${dbs[@]}"; do
            printf "${CYAN}║${RESET} %-33s ${CYAN}║${RESET}\n" "$db"
        done
    fi
    echo -e "${CYAN}╚═══════════════════════════════════╝${RESET}"

    read -p "Enter database name to drop: " dbName

    if [ -z "$dbName" ]; then
        echo -e "${RED}Database name cannot be empty.${RESET}"
        press_any_key
        main_menu
        return
    fi
    
    if [ -d "./$dbName" ]; then
        # are you sure?
        while true; do
            read -p "Are you sure you want to drop database '$dbName'? (y/n): " confirm
            case $confirm in
                [yY]) 
                    rm -r ./$dbName
                    break
                    ;;
                [nN])
                    echo -e "${YELLOW}Operation cancelled.${RESET}"
                    press_any_key
                    main_menu
                    return
                    ;;
                *)
                    echo -e "${RED}Invalid choice. Please enter 'y' or 'n'.${RESET}"
                    ;;
            esac
        done
        echo -e "${GREEN}Database '$dbName' dropped successfully.${RESET}"
    else
        echo -e "${RED}Database '$dbName' does not exist.${RESET}"
    fi
    press_any_key
    main_menu
}

function tablesMenu(){
    clear
    echo ""
    echo -e "${CYAN}╔═══════════════════════════════════╗${RESET}"
    echo -e "${CYAN}║${RESET}       ${BOLD}TABLES MENU${RESET}                 ${CYAN}║${RESET}"
    echo -e "${CYAN}╠═══════════════════════════════════╣${RESET}"
    echo -e "${CYAN}║${RESET} ${YELLOW}1)${RESET} Create Table                   ${CYAN}║${RESET}"
    echo -e "${CYAN}║${RESET} ${YELLOW}2)${RESET} List Tables                    ${CYAN}║${RESET}"
    echo -e "${CYAN}║${RESET} ${YELLOW}3)${RESET} Drop Table                     ${CYAN}║${RESET}"
    echo -e "${CYAN}║${RESET} ${YELLOW}4)${RESET} Display Table                  ${CYAN}║${RESET}"
    echo -e "${CYAN}║${RESET} ${YELLOW}5)${RESET} Insert Into Table              ${CYAN}║${RESET}"
    echo -e "${CYAN}║${RESET} ${YELLOW}6)${RESET} Delete From Table              ${CYAN}║${RESET}"
    echo -e "${CYAN}║${RESET} ${YELLOW}7)${RESET} Update Table                   ${CYAN}║${RESET}"
    echo -e "${CYAN}║${RESET} ${YELLOW}8)${RESET} Back to Main Menu              ${CYAN}║${RESET}"
    echo -e "${CYAN}╚═══════════════════════════════════╝${RESET}"
    echo ""
    read -p "Choose an option: " tableChoice

    case $tableChoice in
        1) create_table ;;
        2) list_tables ;;
        3) drop_table ;;
        4) display_table ;;
        5) insert_into_table ;;
        6) delete_from_table ;;
        7) update_table ;;
        8) main_menu ;;
        *) echo -e "${RED}Invalid option Try again${RESET}"; press_any_key; tablesMenu ;;
    esac
}

function create_table(){
    read -p "Enter table name: " tableName

    while [ -z "$tableName" ]; do
        echo -e "${RED}Table name cannot be empty. Please enter a name.${RESET}"
        read -p "Enter table name: " tableName
    done

    if [ -f "./$dbName/$tableName" ]; then
        echo -e "${YELLOW}Table '$tableName' already exists.${RESET}"
        tablesMenu
        return
    fi
    
    # number of columns
    read -p "Enter number of columns: " numCols

    columns=""
    datatypes=""
    primaryKey=""

    for ((i=1; i<=numCols; i++)); do
        read -p "Enter column $i name: " colName

        while [ -z "$colName" ]; do
            echo "Column name cannot be empty. Please enter a name."
            read -p "Enter column $i name: " colName
        done
        
        # Ask for datatype
        while true; do
            echo "Select datatype for '$colName':"
            echo "1) int"
            echo "2) string"
            read -p "Choose datatype: " dtChoice
            
            case $dtChoice in
                1) datatype="int"; break ;;
                2) datatype="string"; break ;;
                *) echo -e "${RED}Invalid choice. Please enter 1 or 2.${RESET}" ;;
            esac
        done

        if [ -z "$columns" ]; then # first column
            columns="$colName"
            datatypes="$datatype"
        else
            columns="$columns:$colName"
            datatypes="$datatypes:$datatype"
        fi
    done


    # primary key
    echo "Please choose one column as primary key:"
    echo "$columns" | tr ':' ' '
    while true; do
        read -p "Enter primary key column name: " primaryKey
        if [ -z "$primaryKey" ]; then
            echo "Primary key name cannot be empty. Please enter a name."
            continue
        fi
        # Check if primaryKey exists in columns
        found=0
        IFS=':' read -ra colArr <<< "$columns"
        for col in "${colArr[@]}"; do
            if [ "$col" = "$primaryKey" ]; then
                found=1
                break
            fi
        done
        if [ $found -eq 1 ]; then
            break
        else
            echo -e "${RED}Column name does not exist. Try again.${RESET}"
        fi
    done

    # save metadata
    echo "#columns:$columns" > "./$dbName/$tableName"
    echo "#datatypes:$datatypes" >> "./$dbName/$tableName"
    echo "#primarykey:$primaryKey" >> "./$dbName/$tableName"
    
    echo "Table '$tableName' created successfully."
    press_any_key
    tablesMenu
}


function list_tables(){
    clear
    if [ $(ls ./$dbName -1 | wc -l) -eq 0 ]; then
        echo -e "${YELLOW}No tables available.${RESET}"
        press_any_key
        tablesMenu
        return
    fi
    echo -e "${CYAN}╔═══════════════════════════════════╗${RESET}"
    echo -e "${CYAN}║${RESET}      ${BOLD}Available Tables${RESET}             ${CYAN}║${RESET}"
    echo -e "${CYAN}╠═══════════════════════════════════╣${RESET}"
    tables=( $(ls ./$dbName) )
    if [ ${#tables[@]} -eq 0 ]; then
        echo -e "${YELLOW}║ No tables available.             ║${RESET}"
    else
        for t in "${tables[@]}"; do
            printf "${CYAN}║${RESET} %-33s ${CYAN}║${RESET}\n" "$t"
        done
    fi
    echo -e "${CYAN}╚═══════════════════════════════════╝${RESET}"
    press_any_key
    tablesMenu
}

function drop_table(){
    clear
    if [ $(ls ./$dbName -1 | wc -l) -eq 0 ]; then
        echo -e "${YELLOW}No tables available.${RESET}"
        press_any_key
        tablesMenu
        return
    fi
    
    tables=( $(ls ./$dbName) )
    echo ""
    echo -e "${CYAN}╔═══════════════════════════════════╗${RESET}"
    echo -e "${CYAN}║${RESET}      ${BOLD}Available Tables${RESET}             ${CYAN}║${RESET}"
    echo -e "${CYAN}╠═══════════════════════════════════╣${RESET}"
    if [ ${#tables[@]} -eq 0 ]; then
        echo -e "${YELLOW}║ No tables available.             ║${RESET}"
    else
        for t in "${tables[@]}"; do
            printf "${CYAN}║${RESET} %-33s ${CYAN}║${RESET}\n" "$t"
        done
    fi
    echo -e "${CYAN}╚═══════════════════════════════════╝${RESET}"

    read -p "Enter table name to drop: " tableName
    
    if [ -f "./$dbName/$tableName" ]; then
        # are you sure?
        while true; do
            read -p "Are you sure you want to drop table '$tableName'? (y/n): " confirm
            case $confirm in
                [yY])
                    rm ./$dbName/$tableName
                    break
                    ;;
                [nN])
                    echo -e "${YELLOW}Operation cancelled.${RESET}"
        press_any_key
        tablesMenu
                    return
                    ;;
                *)
                    echo -e "${RED}Invalid choice. Please enter 'y' or 'n'.${RESET}"
                    ;;
            esac
        done
        echo -e "${GREEN}Table '$tableName' dropped successfully.${RESET}"
    else
        echo -e "${RED}Table '$tableName' does not exist.${RESET}"
    fi
    press_any_key
    tablesMenu
}

list_tables_inside(){
    clear
    if [ $(ls ./$dbName -1 | wc -l) -eq 0 ]; then
        echo -e "${YELLOW}No tables available.${RESET}"
        press_any_key
        tablesMenu
        return
    fi
    echo ""
    echo -e "${CYAN}╔═══════════════════════════════════╗${RESET}"
    echo -e "${CYAN}║${RESET}      ${BOLD}Available Tables${RESET}             ${CYAN}║${RESET}"
    echo -e "${CYAN}╠═══════════════════════════════════╣${RESET}"
    tables=( $(ls ./$dbName) )
    if [ ${#tables[@]} -eq 0 ]; then
        echo -e "${YELLOW}║ No tables available.             ║${RESET}"
    else
        for t in "${tables[@]}"; do
            printf "${CYAN}║${RESET} %-33s ${CYAN}║${RESET}\n" "$t"
        done
    fi
    echo -e "${CYAN}╚═══════════════════════════════════╝${RESET}"
}

function insert_into_table(){
    list_tables_inside
    read -p "Enter table name: " tableName
    if [ ! -f "./$dbName/$tableName" ]; then
        echo -e "${RED}Table not found.${RESET}"
        press_any_key
        tablesMenu
        return
    fi

    columns=$(grep "^#columns:" "./$dbName/$tableName" | cut -d':' -f2-)
    pk=$(grep "^#primarykey:" "./$dbName/$tableName" | cut -d':' -f2)
    IFS=':' read -ra colArr <<< "$columns"

    row=""
    pkValue=""
    pkIndex=-1

    for i in "${!colArr[@]}"; do
        if [ "${colArr[$i]}" = "$pk" ]; then
            pkIndex=$i
            break
        fi
    done

    for col in "${colArr[@]}"; do
        read -p "Enter $col: " value

        if [ "$col" = "$pk" ]; then
            pkValue="$value"

            # check for duplicate primary key
            if awk -F':' -v idx=$((pkIndex+1)) -v val="$pkValue" \
                'NR>3 && $idx == val {found=1} END{exit !found}' "./$dbName/$tableName"
            then
                echo -e "${RED}Primary Key already exists!${RESET}"
                press_any_key
                tablesMenu
                return
            fi
        fi

        [ -z "$row" ] && row="$value" || row="$row:$value"
    done

    echo "$row" >> "./$dbName/$tableName"
    echo -e "${GREEN}Row inserted.${RESET}"
    press_any_key
    tablesMenu
}

function display_table(){
    list_tables_inside
    read -p "Enter table name: " tableName
    if [ ! -f "./$dbName/$tableName" ]; then
        echo -e "${RED}Table not found.${RESET}"
        press_any_key
        tablesMenu
        return
    fi

    clear
    columns=$(grep "^#columns:" "./$dbName/$tableName" | cut -d':' -f2-)
    IFS=':' read -ra colArr <<< "$columns"
    numCols=${#colArr[@]}
    # Calculate column width
    colWidth=16
    tableWidth=$((numCols * colWidth + numCols + 1))
    # Top border
    printf "${CYAN}╔"
    for ((i=0; i<numCols; i++)); do
        printf "%0.s═" $(seq 1 $colWidth)
        if [ $i -lt $((numCols-1)) ]; then printf "╦"; fi
    done
    printf "╗${RESET}\n"
    # Header
    printf "${CYAN}║${RESET}"
    for col in "${colArr[@]}"; do
        printf " %-14s ${CYAN}║${RESET}" "$col"
    done
    printf "\n"
    # Separator
    printf "${CYAN}╠"
    for ((i=0; i<numCols; i++)); do
        printf "%0.s═" $(seq 1 $colWidth)
        if [ $i -lt $((numCols-1)) ]; then printf "╬"; fi
    done
    printf "╣${RESET}\n"
    # Rows
    awk -F':' -v numCols="$numCols" -v colWidth="$colWidth" 'NR>3 {
        printf "\033[1;36m║\033[0m";
        for(i=1;i<=numCols;i++) {
            printf " %-14s \033[1;36m║\033[0m", $i;
        }
        printf "\n";
    }' "./$dbName/$tableName"
    # Bottom border
    printf "${CYAN}╚"
    for ((i=0; i<numCols; i++)); do
        printf "%0.s═" $(seq 1 $colWidth)
        if [ $i -lt $((numCols-1)) ]; then printf "╩"; fi
    done
    printf "╝${RESET}\n"
    press_any_key
    tablesMenu
}

function delete_from_table(){
    list_tables_inside
    read -p "Enter table name: " tableName
    if [ ! -f "./$dbName/$tableName" ]; then
        echo -e "${RED}Table not found.${RESET}"
        press_any_key
        tablesMenu
        return
    fi

    read -p "Enter row number to delete: " rowNum
    actualLine=$((rowNum + 3))
    
    sed -i "${actualLine}d" "./$dbName/$tableName" # delete line directly in file
    echo -e "${GREEN}Row deleted.${RESET}"
    press_any_key
    tablesMenu
}

function update_table(){
    list_tables_inside
    read -p "Enter table name: " tableName
    if [ ! -f "./$dbName/$tableName" ]; then
        echo -e "${RED}Table not found.${RESET}"
        press_any_key
        tablesMenu
        return
    fi

    read -p "Enter row number to update: " rowNum
    actualLine=$((rowNum + 3))

    columns=$(grep "^#columns:" "./$dbName/$tableName" | cut -d':' -f2-)
    pk=$(grep "^#primarykey:" "./$dbName/$tableName" | cut -d':' -f2)
    IFS=':' read -ra colArr <<< "$columns"

    oldRow=$(sed -n "${actualLine}p" "./$dbName/$tableName")
    IFS=':' read -ra oldArr <<< "$oldRow"

    row=""
    for i in "${!colArr[@]}"; do
        col="${colArr[$i]}"

        if [ "$col" = "$pk" ]; then
            value="${oldArr[$i]}" # keep primary key same
            echo -e "${YELLOW}$col (PK): $value${RESET}"
        else
            read -p "Enter new $col: " value
        fi

        [ -z "$row" ] && row="$value" || row="$row:$value"
    done

    sed -i "${actualLine}s/.*/$row/" "./$dbName/$tableName"
    echo -e "${GREEN}Row updated.${RESET}"
    press_any_key
    tablesMenu
}



# Main function
main_menu
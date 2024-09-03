#!/bin/bash

# 檢查是否提供了目錄參數
if [ $# -eq 0 ]; then
    echo "使用方法: $0 <目錄路徑>"
    exit 1
fi

# 設定目錄和輸出文件
DIR="$1"
OUTPUT_FILE="ts_files_output.txt"

# 檢查目錄是否存在
if [ ! -d "$DIR" ]; then
    echo "錯誤: 目錄 '$DIR' 不存在"
    exit 1
fi

# 清空或創建輸出文件
> "$OUTPUT_FILE"

# 遍歷目錄中的所有 .ts, .tsx, .json, 和 .css 文件，排除 node_modules、隱藏文件/目錄和 package-lock.json
find "$DIR" \( -name "*.ts" -o -name "*.tsx" -o -name "*.json" -o -name "*.css" \) -type f | while read -r file; do
    # 檢查文件路徑是否包含 node_modules 或以 . 開頭的目錄/文件，並排除 package-lock.json
    if [[ "$file" != *"/node_modules/"* && "$file" != *"/."* && "$(basename "$file")" != "."* && "$(basename "$file")" != "package-lock.json" ]]; then
        # 輸出文件路徑
        echo "文件: $file" >> "$OUTPUT_FILE"
        echo "----------------------------------------" >> "$OUTPUT_FILE"

        # 輸出文件內容
        cat "$file" >> "$OUTPUT_FILE"

        # 添加分隔線
        echo -e "\n========================================\n" >> "$OUTPUT_FILE"
    fi
done

echo "完成! 輸出已保存到 $OUTPUT_FILE"
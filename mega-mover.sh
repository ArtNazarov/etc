# backup files to mega
for f in ./megabooks/files/*; do
    megaput "$f"
done


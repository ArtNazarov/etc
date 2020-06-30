# backup
for f in ./megabooks/files/*; do
    megaput "$f"
    mv "$f" ./uploaded/
done


"""
This script was used to fix all the images when migrating from Wordpress to Hugo. Images on Wordpress are downloaded and saved into static/images before updating the HTML to point to the new image.

This includes all the [singlepic ...] tags which were present.
"""

import requests
from power_edit import power_edit
import os
import AdvancedHTMLParser
import shutil
import re

num_replacements = 0

def strict_find(string, find, start_pos):
    index = string.find(find, start_pos)
    if index == -1:
        raise RuntimeError(f'The text {find} was not found in {string}.')
    return index

def replace_fn_caption_tag(find_str: str) -> str:
    print(f'find_str = {find_str}')

    # WIDTH
    width_start_index = strict_find(find_str, 'width="', 0) + 7
    width_stop_index = strict_find(find_str, '"', width_start_index)
    # print(width_start_index)
    # print(width_stop_index)
    width = find_str[width_start_index:width_stop_index]
    print(f'width = {width}')

    # URL begins after first (
    url_start_index = power_edit.find_nth_match(find_str, ']', 2) + 2
    # print(url_start_index)
    url_stop_index = strict_find(find_str, ')', url_start_index)
    url = find_str[url_start_index:url_stop_index]
    print(f'url = {url}')

    # Caption begins after first ) after url_stop_index
    # Caption ends before next ]
    caption_start_index = strict_find(find_str, ')', url_stop_index + 1) + 2
    # print(f'caption_start_index = {caption_start_index}')
    
    caption_stop_index = strict_find(find_str, '[', caption_start_index)
    # print(f'caption_stop_index = {caption_stop_index}')

    caption = find_str[caption_start_index:caption_stop_index]
    print(f'caption = {caption}')
    # Convert all " to '
    caption = caption.replace('"', "'")

    # Substitue values into template
    template = '{{< figure src="<URL>" width="<WIDTH>px" caption="<CAPTION>" caption-position="bottom" >}}'
    template = template.replace('<URL>', url)
    template = template.replace('<WIDTH>', width)
    template = template.replace('<CAPTION>', caption)
    # print(f'replaced_str = {template}')

    global num_replacements
    num_replacements += 1

    return template

def replace_fn_no_caption_tag(find_str: str) -> str:
    print(find_str)
    caption_start_pos = power_edit.find_nth_match(find_str, '[', 2) + 1
    print(f'caption_start_pos = {caption_start_pos}')
    caption_stop_pos = power_edit.strict_find(find_str, ']', caption_start_pos)
    print(f'caption_stop_pos = {caption_stop_pos}')
    caption = find_str[caption_start_pos:caption_stop_pos]
    # Convert all " to '
    caption = caption.replace('"', "'")
    print(f'caption = {caption}')

    url_start_pos = caption_stop_pos + 2
    url_stop_pos = power_edit.strict_find(find_str, ')', caption_stop_pos)
    url = find_str[url_start_pos: url_stop_pos]
    print(f'url = {url}')

    # Substitue values into template
    template = '{{< figure src="<URL>" caption="<CAPTION>" caption-position="bottom" >}}'
    template = template.replace('<URL>', url)
    template = template.replace('<CAPTION>', caption)

    global num_replacements
    num_replacements += 1

    return template

def replace_fn_single_pic(find_str: str, file_path: str):
    print(f'find_str = {find_str}, file_path = {file_path}')

    id_start_pos = power_edit.strict_find(find_str, 'id=', 0) + 3
    print(f'id_start_pos = {id_start_pos}')

    id_stop_pos = power_edit.strict_find(find_str, ' ', id_start_pos)
    print(f'id_stop_pos = {id_stop_pos}')

    id = find_str[id_start_pos:id_stop_pos]
    print(f'id = {id}')

    # Calculate width
    try:
        width_start_pos = power_edit.strict_find(find_str, 'w=', 0) + 2
        width_stop_pos = power_edit.strict_find(find_str, ' ', width_start_pos)
        img_width = find_str[width_start_pos:width_stop_pos]
    except RuntimeError:
        img_width = None

    print(f'img_width = {img_width}')

    # Calculate the URL
    url_frag_start_pos = power_edit.strict_find(file_path, 'content\\pages\\', 0) + 14
    print(f'url_frag_start_pos = {url_frag_start_pos}')

    url_frag = file_path[url_frag_start_pos: -10]
    print(f'url_frag = {url_frag}')

    full_url = 'http://blog.mbedded.ninja/' + url_frag.replace('\\', '/')
    print(f'full_url = {full_url}')

    #================================
    # CHECK IF HTML ALREADY SAVED
    #================================

    html_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'data', 'html')
    # Make path safe
    file_name = full_url.replace('/', '')
    file_name = file_name.replace(':', '')
    file_name = file_name + '.html'
    file_path = os.path.join(html_dir, file_name)
    print(f'file_path = {file_path}')

    if os.path.isfile(file_path):
        print('HTML already downloaded.')
        with open(file_path, 'r', encoding='utf-8') as the_file:
            html = the_file.read()
    else:
        print('HTML not downloaded, so downloading...')
        response = requests.get(full_url)
        html = response.content.decode('utf-8')        
        with open(file_path, 'w+', encoding='utf-8') as the_file:
            the_file.write(html)

    # print(f'html = {html}')

    #===================================
    # EXTRACT HTML ELEMENTS
    #===================================

    parser = AdvancedHTMLParser.AdvancedHTMLParser()
    parser.parseStr(html)
    elements = parser.getElementsByAttr('data-image-id', id)
    print(f'elements = {elements}')
    assert len(elements) >= 1 # We could find the same image multiple times on the page, this is o.k.
    image_url = elements[0].href

    caption = elements[0].getAttribute('data-description')
    caption = caption.replace('"', "'") # Remove any " from caption
    print(f'caption = {caption}')



    #===================================
    # IMAGE FINDING/DOWNLOADING
    #===================================

    img_file_name = image_url.split('/')[-1]
    print(f'img_file_name = {img_file_name}')
    img_sec_path = image_url[45:]
    print(f'img_sec_path = {img_sec_path}')
    img_base_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'data', 'img')
    print(f'img_base_dir = {img_base_dir}')
    img_path = os.path.join(img_base_dir, img_sec_path.replace('/', '\\'))
    print(f'img_path = {img_path}')

    if os.path.isfile(img_path):
        print(f'Image alredy downloaded')
    else:
        print(f'Image not downloaded, downloading...')
        os.makedirs(os.path.dirname(img_path), exist_ok=True)
        r = requests.get(image_url, stream=True)
        if r.status_code == 200:
            with open(img_path, 'wb') as f:
                r.raw.decode_content = True
                shutil.copyfileobj(r.raw, f) 

    #=============================
    # COPY TO HUGO IF NOT ALREADY THERE
    #=============================

    hugo_image_base_path = os.path.join('C:\\Users\\gbmhu\\code\\Hugo\\quickstart\\static\\images\\')
    hugo_image_path = os.path.join(hugo_image_base_path, img_sec_path.replace('/', '\\'))

    if os.path.isfile(hugo_image_path):
        print(f'Image already exists in Hugo, not copying.')
    else:
        print('Copying image to hugo site.')
        os.makedirs(os.path.dirname(hugo_image_path), exist_ok=True)
        shutil.copyfile(img_path, hugo_image_path)

    #===========================
    # CREATE REPLACEMENT TEXT
    #===========================

    hugo_rel_img_path = '/images/' + img_sec_path
    print(f'hugo_rel_img_path = {hugo_rel_img_path}')

    template = '{{< figure <URL> <CAPTION> caption-position="bottom" <WIDTH> >}}'
    template = template.replace('<URL>', 'src="' + hugo_rel_img_path + '"')

    if caption is not None:
        template = template.replace('<CAPTION>', 'caption="' + caption + '"')
    else:
        template = template.replace('<CAPTION>', '')

    if img_width is None:
        template = template.replace('<WIDTH>', '')
    else:
        template = template.replace('<WIDTH>', 'width="' + img_width + 'px"')

    print(f'replacment_text = {template}')

    global num_replacements
    num_replacements += 1

    return template

def replace_fn_single_pic_posts(find_str: str, file_path: str):
    print(f'find_str = {find_str}, file_path = {file_path}')

    id_start_pos = power_edit.strict_find(find_str, 'id=', 0) + 3
    print(f'id_start_pos = {id_start_pos}')

    id_stop_pos = power_edit.strict_find(find_str, ' ', id_start_pos)
    print(f'id_stop_pos = {id_stop_pos}')

    id = find_str[id_start_pos:id_stop_pos]
    id = id.replace('"', '')
    print(f'id = {id}')


    # Calculate width
    try:
        width_start_pos = power_edit.strict_find(find_str, 'w=', 0) + 2
        width_stop_pos = power_edit.strict_find(find_str, ' ', width_start_pos)
        img_width = find_str[width_start_pos:width_stop_pos]
    except RuntimeError:
        img_width = None

    print(f'img_width = {img_width}')

    # Calculate the URL
    url_frag_start_pos = power_edit.strict_find(file_path, 'content\\posts\\', 0) + 14
    print(f'url_frag_start_pos = {url_frag_start_pos}')

    # Extract fragment from markdown post
    with open(file_path, 'r', encoding='utf-8') as file:
        for line in file:
            print(f'line = {line}')
            if line[0:5] == 'url: ':
                url_frag = line[6:-1]
                print('Found URL fragment. url_frag = {url_frag}')
                break

    # url_frag = file_path[url_frag_start_pos: -10]
    print(f'url_frag = {url_frag}')

    full_url = 'http://blog.mbedded.ninja/' + url_frag.replace('\\', '/')
    print(f'full_url = {full_url}')

    #================================
    # CHECK IF HTML ALREADY SAVED
    #================================

    html_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'data', 'html')
    # Make path safe
    file_name = full_url.replace('/', '')
    file_name = file_name.replace(':', '')
    file_name = file_name + '.html'
    file_path = os.path.join(html_dir, file_name)
    print(f'file_path = {file_path}')

    if os.path.isfile(file_path):
        print('HTML already downloaded.')
        with open(file_path, 'r', encoding='utf-8') as the_file:
            html = the_file.read()
    else:
        print('HTML not downloaded, so downloading...')
        response = requests.get(full_url)
        html = response.content.decode('utf-8')        
        with open(file_path, 'w+', encoding='utf-8') as the_file:
            the_file.write(html)

    # print(f'html = {html}')

    #===================================
    # EXTRACT HTML ELEMENTS
    #===================================

    parser = AdvancedHTMLParser.AdvancedHTMLParser()
    parser.parseStr(html)
    print(f'Looking for attribute data-image-id={id}')
    # print(html)
    elements = parser.getElementsByAttr('data-image-id', id)
    print(f'elements = {elements}')
    assert len(elements) >= 1 # We could find the same image multiple times on the page, this is o.k.
    image_url = elements[0].href

    caption = elements[0].getAttribute('data-description')
    caption = caption.replace('"', "'") # Remove any " from caption
    print(f'caption = {caption}')

    #===================================
    # IMAGE FINDING/DOWNLOADING
    #===================================

    img_file_name = image_url.split('/')[-1]
    print(f'img_file_name = {img_file_name}')
    img_sec_path = image_url[45:]
    print(f'img_sec_path = {img_sec_path}')
    img_base_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'data', 'img')
    print(f'img_base_dir = {img_base_dir}')
    img_path = os.path.join(img_base_dir, img_sec_path.replace('/', '\\'))
    print(f'img_path = {img_path}')

    if os.path.isfile(img_path):
        print(f'Image alredy downloaded')
    else:
        print(f'Image not downloaded, downloading...')
        os.makedirs(os.path.dirname(img_path), exist_ok=True)
        r = requests.get(image_url, stream=True)
        if r.status_code == 200:
            with open(img_path, 'wb') as f:
                r.raw.decode_content = True
                shutil.copyfileobj(r.raw, f) 

    #=============================
    # COPY TO HUGO IF NOT ALREADY THERE
    #=============================

    hugo_image_base_path = os.path.join('C:\\Users\\gbmhu\\code\\Hugo\\quickstart\\static\\images\\')
    hugo_image_path = os.path.join(hugo_image_base_path, img_sec_path.replace('/', '\\'))

    if os.path.isfile(hugo_image_path):
        print(f'Image already exists in Hugo, not copying.')
    else:
        print('Copying image to hugo site.')
        os.makedirs(os.path.dirname(hugo_image_path), exist_ok=True)
        shutil.copyfile(img_path, hugo_image_path)

    #===========================
    # CREATE REPLACEMENT TEXT
    #===========================

    hugo_rel_img_path = '/images/' + img_sec_path
    print(f'hugo_rel_img_path = {hugo_rel_img_path}')

    template = '{{< figure <URL> <CAPTION> caption-position="bottom" <WIDTH> >}}'
    template = template.replace('<URL>', 'src="' + hugo_rel_img_path + '"')

    if caption is not None:
        template = template.replace('<CAPTION>', 'caption="' + caption + '"')
    else:
        template = template.replace('<CAPTION>', '')

    if img_width is None:
        template = template.replace('<WIDTH>', '')
    else:
        template = template.replace('<WIDTH>', 'width="' + img_width + 'px"')

    print(f'replacment_text = {template}')

    global num_replacements
    num_replacements += 1

    return template


power_edit = power_edit.PowerEdit()
power_edit.sim_run = False
results = power_edit.find_files('C:\\Users\\gbmhu\\code\\Hugo\\quickstart\\content\\posts\\' + '**/*.md', recursive=True)

# results = [
    # 'C:\\Users\\gbmhu\\code\\Hugo\\quickstart\\content\\pages\\electronics\\components\\capacitors\\_index.md'
# ]

for i in range(len(results)):
    print(f'Processing file {i}, path = {results[i]}')
    # REPLACE [caption] PICS
    # power_edit.find_replace_regex(results[i], '\[caption.*?\[/caption\]', replace_fn_caption_tag, multiline=True)
    
    # REPLACE []() STYLE PICS
    # pattern = '\[\!\[.*?\]\(.*?\).*?\]\(.*?\)'
    # power_edit.find_replace_regex(results[i], pattern, replace_fn_no_caption_tag, multiline=True)

    # REPLACING SINGLE PIC
    # pattern = '\[singlepic.*?\]'
    # power_edit.find_replace_regex(results[i], pattern, replace_fn_single_pic_posts, multiline=True)

    # REMOVING CAPTION-POSITION=BOTTOM
    pattern = re.escape('caption-position="bottom"')
    power_edit.find_replace_regex(results[i], pattern, '', multiline=True)

print(f'num_replacements = {num_replacements}')
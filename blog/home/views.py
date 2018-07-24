from django.http import HttpResponse, FileResponse
from django.template import Context,loader
from django.shortcuts import render
import psycopg2
from collections import OrderedDict
#import operator

def index(request):
    conn = psycopg2.connect("dbname=blog user=pat password=password")
    cur = conn.cursor()
    cur.execute("SELECT * FROM posts ORDER BY date DESC;")
    context = {}
    posts = OrderedDict()
    for record in cur:
        uuid = record[0]
        slug = record[1]
        content = record[2]
        date = record[3]
        post = {'uuid':uuid,'slug':slug,'content':content,'date':date}
        posts[uuid] = post
    context['static'] = '/static'
    context['posts'] = posts
    cur.close()
    return render(request, 'index.html',context)
def edits(request):
    return FileResponse(open('static/data.geojson'))
def resume(request):
    return render(request, 'resume.html',{'static':'/static'})
from django.urls import path
from django.conf.urls import url

from .views import ArticleViewSet

urlpatterns = [
    path(
        '',
        ArticleViewSet.as_view({
            'get': 'list',
            'post': 'create'}),
        name='article-list'
    ),
    path(
        '<pk>',
        ArticleViewSet.as_view({
            'get': 'retrieve',
            'put': 'update',
            'patch': 'partial_update',
            'delete': 'destroy'}),
        name='article_detail',
    )
]

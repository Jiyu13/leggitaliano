from django.contrib import admin
from .models import *


@admin.register(AppUser)
class UserAdmin(admin.ModelAdmin):
    list_display = ("user_id", 'email', 'username', 'is_staff')
    search_fields = ('email',)
    ordering = ('email',)
    list_filter = ("is_staff",)


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ("id", "user", 'title', 'current_page', 'uuid', "finished", "created_at", "update_at")


@admin.register(Verb)
class VerbAdmin(admin.ModelAdmin):
    list_display = (
        "id", "infinitive", 'translation', 'presente', 'perfetto', "gerundio", "imperfetto", "passato_remoto",
        'futuro', 'congiuntivo_presente', 'congiuntivo_imperfetto', 'condizionale', 'imperativo', 'values'
    )

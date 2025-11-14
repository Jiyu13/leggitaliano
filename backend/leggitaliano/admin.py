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
    search_fields = ['=infinitive']


@admin.register(WordType)
class WordTypeAdmin(admin.ModelAdmin):
    list_display = ("id", "type", "full_name", "cn")


@admin.register(Language)
class LanguageAdmin(admin.ModelAdmin):
    list_display = ("id", "name")


@admin.register(Dictionary)
class DictionaryAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "source_lang", "target_lang")


@admin.register(DictionaryWord)
class DictionaryWordAdmin(admin.ModelAdmin):
    list_display = ("id", "word", "formatted_word_type", "parent", "dictionary")
    autocomplete_fields = ['parent']
    search_fields = ['=word', "=word_type__type", "=parent__word"]
    # readonly_fields = ['word',]

    @admin.display(description="Word Type")
    def formatted_word_type(self, obj):
        # adjust based on actual fields on your WordType model
        return f"{obj.word_type.type} - {obj.word_type.cn}"


@admin.register(Sentence)
class SentenceAdmin(admin.ModelAdmin):
    list_display = ("id", "word", "sentence", "translation")
    search_fields = ['word']
    readonly_fields = ['word']
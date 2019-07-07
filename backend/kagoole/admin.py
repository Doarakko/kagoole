from django.contrib import admin
from reversion.admin import VersionAdmin

from .models import Solution


@admin.register(Solution)
class SolutionAdmin(VersionAdmin):
    pass

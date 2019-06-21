from django.contrib import admin
from reversion.admin import VersionAdmin

from .models import Solution, Tips


@admin.register(Solution)
class SolutionAdmin(VersionAdmin):
    pass


@admin.register(Tips)
class TipsAdmin(VersionAdmin):
    pass

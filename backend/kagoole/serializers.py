from django.db.models import Count
from rest_framework import serializers

from kagoole.models import Competition, Solution, Tips


class CompetitionSerializer(serializers.ModelSerializer):
    solution_count = serializers.SerializerMethodField()

    class Meta:
        model = Competition
        fields = '__all__'
        extra_fields = ['solution_count']

    def get_solution_count(self, obj):
        try:
            return Solution.objects.filter(competition__id=obj.pk).values(
                'competition').annotate(total=Count('competition')).get()['total']
        except Exception as e:
            return 0


class SolutionSerializer(serializers.ModelSerializer):
    competition_info = serializers.SerializerMethodField()

    class Meta:
        model = Solution
        fields = '__all__'
        extra_fields = ['competition_info']

    def get_competition_info(self, obj):
        return dict(
            ref=getattr(obj.competition, 'ref'),
            title=getattr(obj.competition, 'title'),
            can_get_award_points=getattr(
                obj.competition, 'can_get_award_points'),
            category=getattr(
                obj.competition, 'category'),
            evaluation_metric=getattr(obj.competition, 'evaluation_metric'),
        )

    # def validate_rank(self, value):
    #     if value <= 0:
    #         raise serializers.ValidationError(
    #             'A valid positive integer is required.')


class TipsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tips
        fields = '__all__'

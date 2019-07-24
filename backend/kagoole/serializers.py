import time
import datetime

from rest_framework import serializers

from kagoole.models import Competition, Solution


class CompetitionSerializer(serializers.ModelSerializer):
    is_in_progress = serializers.SerializerMethodField()

    class Meta:
        model = Competition
        fields = '__all__'
        extra_fields = ['is_in_progress']

    def get_is_in_progress(self, obj):
        return obj.ended_at.replace(tzinfo=None) > datetime.datetime.utcnow()


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
            is_kernel_only=getattr(obj.competition, 'is_kernel_only'),
            team_count=getattr(obj.competition, 'team_count'),
            url=getattr(obj.competition, 'url'),
            data_types=getattr(obj.competition, 'data_types'),
            started_at=getattr(obj.competition, 'started_at'),
            ended_at=getattr(obj.competition, 'ended_at'),
            tags=getattr(obj.competition, 'tags'),
            organization_name=getattr(obj.competition, 'organization_name'),
            kaggle_competition_id=getattr(
                obj.competition, 'kaggle_competition_id'),
            reward=getattr(obj.competition, 'reward'),
            description=getattr(obj.competition, 'description'),
        )

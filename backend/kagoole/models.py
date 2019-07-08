from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.postgres.fields import ArrayField


class Competition(models.Model):
    # id
    competition_id = models.PositiveIntegerField(unique=True)
    # ref
    ref = models.CharField(max_length=100, unique=True)
    # title
    title = models.CharField(max_length=100)
    # description
    description = models.TextField()
    # url
    url = models.URLField(max_length=200, unique=True)

    # category
    category = models.CharField(max_length=20)
    # evaluationMetric
    evaluation_metric = models.CharField(max_length=80, null=True)

    # tags
    tags = ArrayField(
        models.CharField(max_length=30)
    )
    data_types = ArrayField(
        models.CharField(max_length=15)
    )
    predict_type = models.CharField(max_length=30, null=True)

    # isKernelsSubmissionsOnly
    is_kernel_only = models.BooleanField()
    # awardsPoints
    can_get_award_points = models.BooleanField()
    # reward
    reward = models.PositiveIntegerField()

    # organizationName
    organization_name = models.CharField(max_length=50, null=True)
    # organizationRef
    organization_ref = models.CharField(max_length=50, null=True)

    # teamCount
    team_count = models.PositiveIntegerField()

    # enabledDate
    started_at = models.DateTimeField()
    # deadline
    ended_at = models.DateTimeField()

    def __str__(self):
        return self.title


class Solution(models.Model):
    rank = models.PositiveIntegerField()
    url = models.URLField(max_length=200, unique=True)

    MEDAL_CHOICES = [
        ('Gold', 'Gold'),
        ('Silver', 'Silver'),
        ('Bronze', 'Bronze'),
        ('Nothing', 'Nothing'),
    ]
    medal = models.CharField(
        max_length=10, choices=MEDAL_CHOICES)

    # top_rate = models.IntegerField()
    include_code = models.BooleanField()
    competition = models.ForeignKey(
        Competition, on_delete=models.CASCADE)

    def __str__(self):
        return self.url

    # def save(self):
    #     top_rate = self.rank / self.competition.team_count

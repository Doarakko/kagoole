from rest_framework import filters, generics, viewsets
from django_filters.rest_framework import DjangoFilterBackend


from kagoole.models import Competition, Solution, Tips
from kagoole.serializers import CompetitionSerializer, SolutionSerializer, TipsSerializer


class CompetitionList(viewsets.ReadOnlyModelViewSet):
    queryset = Competition.objects.all()
    serializer_class = CompetitionSerializer

    filter_backends = (filters.SearchFilter, DjangoFilterBackend,)
    filterset_fields = '__all__'
    search_fields = (
        'title',
        'description',
        'category',
        'evaluation_metric',
        'organization_name',
    )


class SolutionList(generics.ListCreateAPIView):
    queryset = Solution.objects.all()
    serializer_class = SolutionSerializer
    filter_backends = (filters.SearchFilter, DjangoFilterBackend,)
    filterset_fields = (
        'rank',
        'medal',
        'competition__title',
        'competition__description',
        'competition__category',
        'competition__evaluation_metric',
        'competition__organization_name',
        'competition__can_get_award_points',
    )
    search_fields = (
        'medal',
        'competition__title',
        'competition__description',
        'competition__category',
        'competition__evaluation_metric',
        'competition__organization_name',
    )


class SolutionDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Solution.objects.all()
    serializer_class = SolutionSerializer


class TipsList(generics.ListCreateAPIView):
    queryset = Tips.objects.all()
    serializer_class = SolutionSerializer

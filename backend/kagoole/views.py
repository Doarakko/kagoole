from rest_framework import filters, generics, viewsets
from django_filters.rest_framework import DjangoFilterBackend

from kagoole.models import Competition, Solution
from kagoole.serializers import CompetitionSerializer, SolutionSerializer


class CompetitionList(viewsets.ReadOnlyModelViewSet):
    queryset = Competition.objects.all()
    serializer_class = CompetitionSerializer


class SolutionList(generics.ListCreateAPIView):
    queryset = Solution.objects.all()
    serializer_class = SolutionSerializer
    filter_backends = (DjangoFilterBackend,)
    filterset_fields = (
        'url',
    )


class SolutionDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Solution.objects.all()
    serializer_class = SolutionSerializer

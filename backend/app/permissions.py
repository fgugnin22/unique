from rest_framework.permissions import IsAdminUser, SAFE_METHODS


class IsAdminUserOrReadOnly(IsAdminUser):
    # кастомное разрешение если админ - можно делать все, если нет - только читать
    def has_permission(self, request, view) -> bool:
        is_admin = super().has_permission(request, view)
        return request.method in SAFE_METHODS or is_admin
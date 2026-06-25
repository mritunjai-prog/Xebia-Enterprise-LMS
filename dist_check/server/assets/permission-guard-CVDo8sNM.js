import { useMemo } from "react";
//#region src/components/auth/permission-guard.js
function usePermissions() {
	return { hasPermission: (_perm) => true };
}
function PermissionGuard({ required, children, fallback = null }) {
	const { hasPermission } = usePermissions();
	if (!useMemo(() => {
		if (!required) return true;
		if (Array.isArray(required)) return required.every((p) => hasPermission(p));
		return hasPermission(required);
	}, [required, hasPermission])) return fallback;
	return children;
}
//#endregion
export { PermissionGuard as t };

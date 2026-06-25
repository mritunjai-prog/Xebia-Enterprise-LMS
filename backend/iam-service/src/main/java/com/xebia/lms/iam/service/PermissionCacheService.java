package com.xebia.lms.iam.service;

import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Service;

@Service
public class PermissionCacheService {
    private final CacheManager cacheManager;

    public PermissionCacheService(CacheManager cacheManager) {
        this.cacheManager = cacheManager;
    }

    public void invalidateEffectivePermissions() {
        Cache cache = cacheManager.getCache("effective-permissions");
        if (cache != null) {
            cache.clear();
        }
    }
}

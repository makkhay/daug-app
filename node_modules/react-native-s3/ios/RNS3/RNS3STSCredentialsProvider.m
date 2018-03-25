#import "RNS3STSCredentialsProvider.h"

@implementation RNS3STSCredentialsProvider

- (instancetype)initWithAccessKey:(NSString *)accessKey
                        secretKey:(NSString *)secretKey
                       sessionKey:(NSString *)sessionKey {
    if (self = [super init]) {
        _cachedCredentials = [[AWSCredentials alloc] initWithAccessKey:accessKey
                                                             secretKey:secretKey
                                                            sessionKey:sessionKey
                                                            expiration:nil];
    }
    return self;
}

- (AWSTask<AWSCredentials *> *)credentials {
    return [AWSTask taskWithResult:self.cachedCredentials];
}

- (void)invalidateCachedTemporaryCredentials {
}

@end

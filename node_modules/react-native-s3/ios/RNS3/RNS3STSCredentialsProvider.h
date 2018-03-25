#import <Foundation/Foundation.h>
#import <AWSCore/AWSCore.h>

@interface RNS3STSCredentialsProvider : NSObject<AWSCredentialsProvider>

@property (nonatomic, readonly) AWSCredentials *cachedCredentials;

- (instancetype)initWithAccessKey:(NSString *)accessKey
                        secretKey:(NSString *)secretKey
                       sessionKey:(NSString *)sessionKey;

@end

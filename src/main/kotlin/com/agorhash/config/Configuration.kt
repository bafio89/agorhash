package com.agorhash.config

import com.agorhash.rest.AlgorandUtils.mainNetAddressReserve
import com.agorhash.rest.AlgorandUtils.mainNetAssetIndex
import com.agorhash.rest.AlgorandUtils.testNetAddressReserve
import com.agorhash.rest.AlgorandUtils.testNetAssetIndex
import com.agorhash.domain.usecase.RetrieveTransactionUseCase
import com.agorhash.adapter.TransactionAdapter
import com.agorhash.adapter.TransactionWithResponseBuilder
import com.agorhash.adapter.repository.BlockchainTransactionRepository
import com.algorand.algosdk.v2.client.common.IndexerClient
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
open class Configuration {

    @Bean
    open fun testNetIndexerClient() =
        IndexerClient("https://testnet-algorand.api.purestake.io/idx2", 443, "")

    @Bean
    open fun mainNetIndexerClient() =
        IndexerClient("https://mainnet-algorand.api.purestake.io/idx2", 443, "")

    @Bean
    open fun testNetTransactionRepository(testNetIndexerClient: IndexerClient) =
        BlockchainTransactionRepository(
            testNetIndexerClient,
            TransactionAdapter(),
            testNetAssetIndex,
            testNetAddressReserve
        )

    @Bean
    open fun mainNetTransactionRepository(mainNetIndexerClient: IndexerClient) =
        BlockchainTransactionRepository(
            mainNetIndexerClient,
            TransactionAdapter(),
            mainNetAssetIndex,
            mainNetAddressReserve
        )

    @Bean
    open fun testNetRetrieveTransactionUseCase(testNetTransactionRepository: BlockchainTransactionRepository) =
        RetrieveTransactionUseCase(testNetTransactionRepository, TransactionWithResponseBuilder())

    @Bean
    open fun mainNetRetrieveTransactionUseCase(mainNetTransactionRepository: BlockchainTransactionRepository) =
        RetrieveTransactionUseCase(mainNetTransactionRepository, TransactionWithResponseBuilder())

}
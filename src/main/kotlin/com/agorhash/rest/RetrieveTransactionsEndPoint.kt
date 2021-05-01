package com.agorhash.rest

import com.agorhash.adapter.TransactionWithAnswers
import com.agorhash.domain.usecase.RetrieveTransactionUseCase
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class RetrieveTransactionsEndPoint(
    private val testNetRetrieveTransactionUseCase: RetrieveTransactionUseCase,
    private val mainNetRetrieveTransactionUseCase: RetrieveTransactionUseCase
) {

    @GetMapping("/testnet/transactions")
    fun getTestNetTransactions(): ResponseEntity<List<TransactionWithAnswers>>? {
        return ResponseEntity.ok(testNetRetrieveTransactionUseCase.retrieveOrderedTransaction())
    }

    @GetMapping("/mainnet/transactions")
    fun getMainNetTransactions(): ResponseEntity<List<TransactionWithAnswers>>? {
        return ResponseEntity.ok(mainNetRetrieveTransactionUseCase.retrieveOrderedTransaction())
    }

}

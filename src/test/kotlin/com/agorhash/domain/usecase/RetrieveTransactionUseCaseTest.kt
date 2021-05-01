package com.agorhash.domain.usecase

import com.agorhash.adapter.TransactionWithAnswers
import com.agorhash.adapter.TransactionWithResponseBuilder
import com.agorhash.adapter.repository.Transaction
import com.agorhash.adapter.repository.TransactionRepository
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test
import java.math.BigInteger
import java.math.BigInteger.ONE
import java.math.BigInteger.TEN

const val message = "A_MESSAGE"

class RetrieveTransactionUseCaseTest {

    @Test
    fun retrieveSortedTransactionWithEqualAmountAndDifferentRound() {

        val transactionRepository =
            TransactionRepository { listOf(aTransaction(1L, ONE, message), aTransaction(
                2L,
                ONE,
                message
            )) }

        val retrieveTransactionUseCase = RetrieveTransactionUseCase(transactionRepository, TransactionWithResponseBuilder())

        val actual = retrieveTransactionUseCase.retrieveOrderedTransaction()

        assertThat(actual.first()).isEqualTo(TransactionWithAnswers(aTransaction(2L, ONE, message), emptyList()))
        assertThat(actual[1]).isEqualTo(TransactionWithAnswers(aTransaction(1L, ONE, message), emptyList()))

    }

    @Test
    fun retrieveSortedTransactionsWithDifferentAmountAndEqualRound() {
        val transactionRepository =
            TransactionRepository { listOf(aTransaction(1L, ONE, message), aTransaction(
                1L,
                TEN,
                message
            )) }

        val retrieveTransactionUseCase = RetrieveTransactionUseCase(transactionRepository, TransactionWithResponseBuilder())

        val actual = retrieveTransactionUseCase.retrieveOrderedTransaction()

        assertThat(actual.first()).isEqualTo(TransactionWithAnswers(aTransaction(1L, TEN, message), emptyList()))
        assertThat(actual[1]).isEqualTo(TransactionWithAnswers(aTransaction(1L, ONE, message), emptyList()))
    }

    @Test
    fun `sort before by amount and than by date`() {

        val transactionRepository =
            TransactionRepository {
                listOf(
                    aTransaction(
                        1L, ONE, message
                    ),
                    aTransaction(1L, TEN, message),
                    aTransaction(2L, BigInteger.valueOf(5), message),
                    aTransaction(2L, TEN, message)
                )
            }

        val retrieveTransactionUseCase = RetrieveTransactionUseCase(transactionRepository, TransactionWithResponseBuilder())

        val actual = retrieveTransactionUseCase.retrieveOrderedTransaction()

        assertThat(actual[0]).isEqualTo(TransactionWithAnswers(aTransaction(2L, TEN, message), emptyList()))
        assertThat(actual[1]).isEqualTo(TransactionWithAnswers(aTransaction(1L, TEN, message), emptyList()))
        assertThat(actual[2]).isEqualTo(TransactionWithAnswers(aTransaction(2L, BigInteger.valueOf(5), message), emptyList()))
        assertThat(actual[3]).isEqualTo(TransactionWithAnswers(aTransaction(1L, ONE, message), emptyList()))

    }

    @Test
    fun `skip transaction with empty message`() {

        val emptyMessage = ""

        val transactionRepository =
            TransactionRepository {
                listOf(
                    aTransaction(
                        1L, ONE, emptyMessage
                    )
                )
            }

        val retrieveTransactionUseCase = RetrieveTransactionUseCase(transactionRepository, TransactionWithResponseBuilder())

        val actual = retrieveTransactionUseCase.retrieveOrderedTransaction()

       assertThat(actual).isEmpty()

    }

    private fun aTransaction(confirmedRound: Long, amount: BigInteger, message: String) = Transaction(
        id = "A_TRANSACTION_ID",
        sender = "A_SENDER",
        message = message,
        confirmedRound = confirmedRound,
        amount = amount
    )
}
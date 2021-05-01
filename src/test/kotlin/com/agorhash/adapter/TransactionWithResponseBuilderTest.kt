package com.agorhash.adapter

import com.agorhash.adapter.repository.Transaction
import org.assertj.core.api.Assertions
import org.junit.jupiter.api.Test
import java.math.BigInteger

class TransactionWithResponseBuilderTest {

    @Test
    fun `when there are no response`() {
        val transaction =
            Transaction("A TRANSACTION ID", "A SENDER", "a message", 123L, BigInteger.ZERO)

        val anotherTransaction = Transaction(
            "TRANSACTION ID",
            "ANOTHER SENDER",
            "another message",
            456L,
            BigInteger.ZERO
        )

        val transactionWithResponseBuilder = TransactionWithResponseBuilder()
        val actual =
            transactionWithResponseBuilder.buildFrom(listOf(transaction, anotherTransaction))

        Assertions.assertThat(actual)
            .isEqualTo(listOf(TransactionWithAnswers(transaction, emptyList()),  TransactionWithAnswers(anotherTransaction, emptyList())))
    }

    @Test
    fun `when there is an answer`() {

        val transaction =
            Transaction("NGD6S6KQKAP6QX55SQLBHXWTABPJVI6U3KPNLG4B3M64RW4PQNVA", "A SENDER", "a message", 123L, BigInteger.ZERO)

        val answerTransaction = Transaction(
            "TRANSACTION ID",
            "ANOTHER SENDER",
            "[NGD6S6KQKAP6QX55SQLBHXWTABPJVI6U3KPNLG4B3M64RW4PQNVA] a response",
            456L,
            BigInteger.ZERO
        )

        val expectedAnswer = Transaction(
            "TRANSACTION ID",
            "ANOTHER SENDER",
            "a response",
            456L,
            BigInteger.ZERO
        )

        val transactionWithResponseBuilder = TransactionWithResponseBuilder()
        val actual =
            transactionWithResponseBuilder.buildFrom(listOf(transaction, answerTransaction))

        Assertions.assertThat(actual)
            .isEqualTo(listOf(TransactionWithAnswers(transaction, listOf(expectedAnswer))))
    }

    @Test
    fun `when there are answer with same date and different amount`() {

        val transaction =
            Transaction("NGD6S6KQKAP6QX55SQLBHXWTABPJVI6U3KPNLG4B3M64RW4PQNVA", "A SENDER", "a message", 123L, BigInteger.ZERO)

        val answerTransaction = Transaction(
            "TRANSACTION ID",
            "SENDER",
            "[NGD6S6KQKAP6QX55SQLBHXWTABPJVI6U3KPNLG4B3M64RW4PQNVA] a response",
            456L,
            BigInteger.ZERO
        )

        val anotherAnswerTransaction = Transaction(
            "ANOTHER TRANSACTION ID",
            "ANOTHER SENDER",
            "[NGD6S6KQKAP6QX55SQLBHXWTABPJVI6U3KPNLG4B3M64RW4PQNVA] another response",
            456L,
            BigInteger.TEN
        )

        val firstExpectedAnswer = Transaction(
            "ANOTHER TRANSACTION ID",
            "ANOTHER SENDER",
            "another response",
            456L,
            BigInteger.TEN
        )

        val secondExpectedAnswer = Transaction(
            "TRANSACTION ID",
            "SENDER",
            "a response",
            456L,
            BigInteger.ZERO
        )


        val transactionWithResponseBuilder = TransactionWithResponseBuilder()
        val actual =
            transactionWithResponseBuilder.buildFrom(listOf(transaction, answerTransaction, anotherAnswerTransaction))

        Assertions.assertThat(actual[0].transaction).isEqualTo(transaction)
        Assertions.assertThat(actual[0].answers).containsExactly(firstExpectedAnswer, secondExpectedAnswer)
    }
}
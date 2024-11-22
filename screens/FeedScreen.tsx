import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  StyleSheet,
  RefreshControl,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import axios from "axios";
import { RegularText, SmallText } from "@/components/StyledText";

interface DataItem {
  id: string;
  author: string;
  download_url: string;
}

const FeedScreen = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (isRefresh = false) => {
    if (loadingMore && !isRefresh) return;

    isRefresh ? setRefreshing(true) : setLoadingMore(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://picsum.photos/v2/list?page=${isRefresh ? 1 : page}&limit=10`
      );
      setData(isRefresh ? response.data : [...data, ...response.data]);
      setPage(isRefresh ? 2 : page + 1);
    } catch (err) {
      setError("Failed to load data. Please try again.");
      Alert.alert("Error", "Failed to load data. Please try again.");
    } finally {
      setRefreshing(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  };

  const renderEmptyComponent = () => {
    if (error) {
      return (
        <View style={styles.emptyContainer}>
          <SmallText style={styles.errorText}>{error}</SmallText>
        </View>
      );
    }

    return (
      <View style={styles.emptyContainer}>
        <RegularText style={styles.emptyText}>No data available</RegularText>
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }: { item: DataItem }) => (
        <View style={styles.card}>
          <Image
            source={{ uri: item.download_url }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.authorContainer}>
            <RegularText style={styles.authorText}>{item.author}</RegularText>
          </View>
        </View>
      )}
      onEndReached={() => fetchData()}
      onEndReachedThreshold={0.1}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={renderEmptyComponent}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => fetchData(true)}
        />
      }
    />
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  authorContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  authorText: {
    color: "#fff",
    fontSize: 16,
  },
  footer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f9f9f9",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  emptyText: {
    fontSize: 18,
    color: "#666",
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
});

export default FeedScreen;

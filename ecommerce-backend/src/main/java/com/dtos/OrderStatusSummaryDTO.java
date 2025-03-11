package com.dtos;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

public class OrderStatusSummaryDTO {
    private List<String> months;
    private List<Map<String, Object>> status;

    public OrderStatusSummaryDTO() {
        this.months = new ArrayList<>();
        this.status = new ArrayList<>();
    }

    public void addMonth(String month) {
        this.months.add(month);
    }

    public void addStatus(String name, List<Integer> data) {
        Map<String, Object> statusData = new TreeMap<>();
        statusData.put("name", name);
        statusData.put("data", data);
        this.status.add(statusData);
    }

    public List<String> getMonths() {
        return months;
    }

    public List<Map<String, Object>> getStatus() {
        return status;
    }
}

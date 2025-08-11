package music_web.history.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import music_web.history.dto.HistoryRequest;
import music_web.history.entity.ListeningHistory;
import music_web.history.service.HistoryService;

@RestController
@RequestMapping("/api/history")
@CrossOrigin(origins = "http://localhost:5173")
public class HistoryController {

    private final HistoryService historyService;
    private final RestTemplate restTemplate;

    @Autowired
    public HistoryController(HistoryService historyService, RestTemplate restTemplate) {
        this.historyService = historyService;
        this.restTemplate = restTemplate;
    }

    @PostMapping("/add")
    public ListeningHistory addHistory(@RequestBody HistoryRequest request) {
        return historyService.saveHistory(request.getUserId(), request.getSongId());
    }

    @GetMapping("/{userId}")
    public List<Map<String, Object>> getUserHistoryWithSong(@PathVariable Long userId) {
        List<ListeningHistory> histories = historyService.getUserHistory(userId);
        List<Map<String, Object>> result = new ArrayList<>();

        for (ListeningHistory h : histories) {
            // Gọi API Node.js để lấy chi tiết bài hát
            String songApiUrl = "http://localhost:5000/api/songs/" + h.getSongId();
            Map songDetails = restTemplate.getForObject(songApiUrl, Map.class);

            Map<String, Object> combined = new HashMap<>();
            combined.put("id", h.getId());
            combined.put("listenedAt", h.getListenedAt());
            combined.put("songId", h.getSongId());
            combined.put("song", songDetails);  // Thêm thông tin bài hát

            result.add(combined);
        }

        return result;
    }
}
